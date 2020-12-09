import UserManager from './UserManager';
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
    return checkedList;
  }

  build({room, sockets}) {
    const idList = sockets
      .map(socketID => UserManager.get({ socketID }))
      .map(({ id }) => id);
    idList.sort(() => Math.random() - .5);
    GameList[room] = {
      idList,
      checkedList: [],
    };
  }

  // TODO: build the GameList[room] shouldn't at get method
  get(room) {
    // if(!GameList[room]) {
    //   GameList[room] = {...initData};
    // }
    return GameList[room].checkedList || [];
  }

  close(room) {
    delete GameList[room];
    return true;
  }
}

export default new GameManager();