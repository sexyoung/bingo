// const initData = {
//   idList: [],
//   checkedList: [],
// };
import { User } from './User';

const game = {};

export class Game {

  static checked(room, num) {
    const checkedList = [...new Set([...game[room].checkedList, num])];
    checkedList.sort((a, b) => a - b);
    game[room].checkedList = checkedList;
    return checkedList;
  }

  static build({room, sockets}) {
    const idList = sockets.map(User.get).map(({ id }) => id);
    idList.sort(() => Math.random() - .5);
    game[room] = {
      idList,
      checkedList: [],
    };
  }

  // TODO: build the game[room] shouldn't at get method
  static get(room) {
    // if(!game[room]) {
    //   game[room] = {...initData};
    // }
    return game[room].checkedList || [];
  }

  static close(room) {
    delete game[room];
    return true;
  }
}