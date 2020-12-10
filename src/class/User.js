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
      // socket 不用存
      !['socket', 'room', 'matrix'].includes(v)
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
    // this.room = room;
    this.socket.emit(
      SocketEvent.Room.PlayerJoin,
      room,
      JSON.parse(localStorage.getItem('bingoUser'))
    );
  }

  send(room, message) {
    this.socket.emit(SocketEvent.Room.MessageSend, room, message);
  }

  updateProcess(room, percentage) {
    this.socket.emit(
      SocketEvent.Room.UpdateProcess,
      room,
      percentage
    );
  }

  changeName(room, newName) {
    this.name = newName;
    this.save();
    this.socket.emit(SocketEvent.User.ChangeName, room, newName);
  }

  startGame(room, size, winLine) {
    this.socket.emit(SocketEvent.Room.TriggerStartGame, room, size, winLine);
  }

  saveMatrix2Server(room, matrix) {
    this.socket.emit(SocketEvent.Room.SaveMatrix, room, matrix);
  }

  checked(room, num) {
    if(!this.checkedList) {
      this.checkedList = [];
    }
    this.checkedList = [...new Set([...this.checkedList, num])].sort((a, b) => a - b);
    this.socket.emit(
      SocketEvent.Game.CheckNum,
      room,
      num
    );
  }

  fetchMatrix(room) {
    this.socket.emit(
      SocketEvent.Game.FetchMatrix,
      room
    );
  }

  leave() {
    this?.socket.close();
  }
}