import { Room, JoinRoom, JoinUser, GameUser } from ".";
import { genWinStr, randMatrix } from 'utils';

export class GameRoom extends Room {
  winUsers = [];
  turnIndex = 0; // player index?
  checkedList = []; // number[]
  constructor(room) {
    super(room);
    this.winStr = genWinStr(room.size);
    this.user = room.user.map(user => new GameUser(user.name, user.id, user.matrix));
    room = undefined;
  }

  checked(num) {
    /**
     * 影響所有玩家的matrix
     * checkedList 也要新增
     */
    if(this.winUsers.length) return;

    if(this.checkedList.includes(num)) {
      throw('exists');
    }

    this.checkedList.push(num);

    this.user.forEach(user => {
      user.updateWinCount(this);
    });

    this.winUsers = this.user.filter(({ winCount }) => winCount >=  this.winLine);

    if(this.winUsers.length) {
      return this.end(this.winUsers);
    }

    console.warn(
      `= emit = turnNext`,
      this.user.map(({ id, name, winCount }) => ({
        id,
        name,
        winCount,
      }))
    );

    this.turnIndex = (this.turnIndex + 1) % this.user.length;
  }

  end() {
    console.warn(`= emit = end`, this.winUsers);
  }

  backReady() {
    const joinRoom = new JoinRoom(this);
    this.user.forEach(user => {
      joinRoom.invite(new JoinUser(user));
    });
    return joinRoom;
  }

  restart() {
    this.winUsers = [];
    this.turnIndex = 0;
    this.checkedList = [];

    this.user.forEach(user => {
      user.winCount = 0;
      user.matrix = randMatrix(this.size);
    });
  }
}