import UserManager from './UserManager';
import { genWinStr } from './utils';
import { SocketEvent } from "../src/const";

const GameList = {};
let instance = null;

class GameManager {

  constructor() {
    if(!instance) {
      instance = this;
    }
    return instance;
  }

  updatePlayer({io, id, sockets}) {
    // console.warn('====', sockets.map(User.get));
    io.to(id).emit(
      SocketEvent.Room.PlayerUpdate,
      sockets.map(socketID => UserManager.get({ socketID }))
    );
  }

  checked(room, num) {
    const checkedList = [...new Set([...GameList[room].checkedList, num])];
    checkedList.sort((a, b) => a - b);
    GameList[room].checkedList = checkedList;
    GameList[room].turnIndex = (GameList[room].turnIndex + 1) % GameList[room].idList.length;
    return checkedList;
  }

  build({size, winLine, room, sockets}) {
    const idList = sockets
      .map(socketID => UserManager.get({ socketID }))
      .map(({ id }) => ({ id, matrix: [] }));
    idList.sort(() => Math.random() - .5);
    GameList[room] = {
      size,
      idList,
      winLine,
      turnIndex: 0,
      checkedList: [],
      winStr: genWinStr(size),
    };
  }

  get(room) {
    return GameList[room] || {};
  }

  close(room) {
    delete GameList[room];
    return true;
  }
}

export default new GameManager();