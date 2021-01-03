import { makeID } from "utils";

export class User {
  id;
  name;
  matrix = [];

  constructor(name = 'Player', id = makeID()) {
    this.id = id;
    this.name = name;
  }

  // 要通知所有房間的人
  sendMessage(message) {
    console.warn(message);
  }

  setMatrix(matrix) {
    this.matrix = matrix;
  }
}