import { SocketEvent } from "const";
import { getRandomChar } from "utils";

export class User {
  constructor(socket) {
    let user = localStorage.getItem('bingoUser');
    if(!user) {
      user = JSON.stringify({
        name: 'Player',
        id: this.getGUID(),
      });
      localStorage.setItem('bingoUser', user);
    }
    const attr = JSON.parse(user);
    for (const key in attr) {
      this[key] = attr[key];
    }
    this.socket = socket;

    this.socket?.on("connected", socketID => {
      console.log('socketID connected: ', socketID);
    });
  }

  save() {
    const saveUser = {};
    const attr = Object.keys(this).filter(v =>
      // socket, room 不用存
      !['socket', 'room'].includes(v)
    );

    for (let i = 0; i < attr.length; i++) {
      saveUser[attr[i]] = this[attr[i]];
    }

    localStorage.setItem('bingoUser', JSON.stringify(saveUser));
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
    this.socket.emit(
      SocketEvent.Room.PlayerJoin,
      room,
      JSON.parse(localStorage.getItem('bingoUser'))
    );
  }

  send(message) {
    this.socket.emit(SocketEvent.Room.MessageSend, this.room, message);
  }

  changeName(newName) {
    this.name = newName;
    this.save();
    this.socket.emit(SocketEvent.User.ChangeName, this.room, newName);
  }

  leave() {
    this?.socket.close();
  }
}