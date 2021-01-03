import { Room } from "./Room";
import { GameRoom } from "./GameRoom";
import { randMatrix } from 'utils';

export class JoinRoom extends Room {

  setSize(size) { this.size = size; }
  setWinLine(winLine) { this.winLine = winLine; }

  invite(user) {
    if(!this.size) throw('not set size');
    if(!this.winLine) throw('not set winLine');

    if(this.findUser(user)) return false;

    user.setMatrix(randMatrix(this.size));
    this.user.push(user);
    return true;
  }

  kick(user) {
    const index = this.user.findIndex(u => u === user);
    if(index === -1) return;
    this.user = [
      ...this.user.slice(0, index),
      ...this.user.slice(index + 1),
    ];
  }

  start() {
    // 應檢查人數與size
    if(!this.size) throw('size');
    if(!this.user.length) throw('user');
    this.user.forEach(({ matrix }) => {
      if(matrix.length !== this.size ** 2) throw('matrix');
    });
    return new GameRoom(this);
  }
}