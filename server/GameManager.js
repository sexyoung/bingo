import UserManager from './UserManager';
import { genWinStr } from './utils';
import { SocketEvent } from "const";
import { UserDepartment } from "class";

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
    UserDepartment.loadAll();
    io.in(id).emit(
      SocketEvent.Room.PlayerUpdate,
      sockets.map(UserDepartment.find.bind(UserDepartment))
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
      winLine: size,
      turnIndex: 0,
      checkedList: [],
      winStr: genWinStr(size),
    };
  }

  removeUser(userID) {
    // remove all user from all gameRoom
    for (const room in GameList) {
      const index = GameList[room].idList.findIndex(user => user.id === userID);
      if(index !== -1) {
        GameList[room].idList = [
          ...GameList[room].idList.slice(0, index),
          ...GameList[room].idList.slice(index + 1),
        ];
      }
    }
  }

  get(room) {
    return GameList[room] || {};
  }

  close(room) {
    const socketIDList = [];
    const idList = GameList[room].idList.map(({ id }) => id);
    delete GameList[room];
    const UserList = UserManager.all();
    for (const socketID in UserList) {
      if(idList.includes(UserList[socketID].id)) {
        socketIDList.push(socketID);
      }
    }
    return socketIDList;
  }
}

export default new GameManager();