import { makeID } from "utils";

export class User {
  id;
  name;
  matrix = [];

  constructor(name = 'Player', id = makeID(), socketID) {
    this.id = id;
    this.name = name;
    this.socketID = socketID;
  }

  // 要通知所有房間的人
  sendMessage(message) {
    console.warn(message);
  }

  /** @deprecated */
  setMatrix(matrix) {
    this.matrix = matrix;
  }
}