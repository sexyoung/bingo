// import { Game } from "./Game";

export class Room {
  name;
  size = 0;
  winLine = 0;
  user = [];

  constructor({ name, size, winLine }) {
    this.name = name;
    this.size = size;
    this.winLine = winLine;
  }

  findUser(user) {
    return this.user.find(u => u === user);
  }
}
