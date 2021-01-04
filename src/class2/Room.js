// import { Game } from "./Game";

export class Room {
  name;
  size = 0;
  winLine = 0;
  user = [];

  constructor({ name, size = 5, winLine = 5 }) {
    this.name = name;
    this.size = size;
    this.winLine = winLine;
  }

  findUser(user) {
    return this.user.find(u => u === user);
  }
}
