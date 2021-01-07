/** @deprecated */
import { User } from "./User";

export class JoinUser extends User {
  constructor({ name, id, socketID }) {
    super(name, id, socketID);
  }
  // 要通知所有房間的人
  rename(name) {
    this.name = name;
  }

  setNum(index, num) {
    if(this.matrix[index]) throw('duplicate');
    this.matrix[index] = num;
  }

  clearMatrix() {
    this.matrix = [];
  }
}