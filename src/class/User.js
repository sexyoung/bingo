import { SocketEvent } from "const";
import { getRandomChar } from "utils";

export class User {
  constructor(socket) {
    let user = localStorage.getItem('bingoUser');
    if(!user) {
      user = JSON.stringify({id: this.getGUID()});
      localStorage.setItem('bingoUser', user);
    }
    const attr = JSON.parse(user);
    for (const key in attr) {
      this[key] = attr[key];
    }
    this.socket = socket;
  }

  getGUID(len = 32) {
    let result = '';
    for (let i = 0; i < len; i++) {
      result += getRandomChar();
      if(i % 8 === 7) result += '-';
    }
    return result.slice(0, result.length - 1);
  }

  join(room) {
    this.room = room;
    this.socket.emit(SocketEvent.Room.PlayerJoin, room);
  }

  send(message) {
    this.socket.emit(SocketEvent.Room.MessageSend, this.room, message);
  }

  leave() {
    this.socket.close();
  }
}