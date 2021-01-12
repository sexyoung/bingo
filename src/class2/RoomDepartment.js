import fs from 'fs';
import { Room } from "./";
import { readFile, writeFile, isExistFile } from "utils";

let instance = null;

class RoomDepartmentSingleton {
  data = {};
  constructor() {
    if(!instance) {
      instance = this;
    }
    return instance;
  }

  new(room) {
    this.data[room.name] = room;
    return room;
  }

  find(socketID) {
    const idList = Object.keys(this.data);
    return idList.find(id => {
      return this.data[id].socketID === socketID;
    });
  }

  room(name) {
    return this.data[name];
  }

  load(name) {
    if(!isExistFile('room', name)) return;
    return this.data[name] = new Room(readFile('room', name));
  }

  loadAll() {
    const roomList = fs.readdirSync('./server/data/room');
    this.data = roomList.reduce((obj, file) => ({
      ...obj,
      [file.slice(0, -5)]: new Room(readFile('room', file.slice(0, -5)))
    }),{});
  }

  save(roomID) {
    writeFile('room', roomID, this.data[roomID]);
  }
}

export const RoomDepartment = new RoomDepartmentSingleton();