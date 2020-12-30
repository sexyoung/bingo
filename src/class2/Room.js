import { Game } from "./Game";

export class Room {
  #game;
  #name;
  #user = [];

  get user() { return this.#user; }
  get game() { return this.#game; }

  constructor(name) {
    this.#name = name;
  }

  findUser(user) {
    return this.#user.find(u => u === user);
  }

  invite(user) {
    if(this.findUser(user)) return false;
    if(!user.room) user.join(this);

    this.#user.push(user);
    return true;
  }

  kick(user) {
    const index = this.#user.findIndex(u => u === user);
    if(index === -1) return;
    this.#user = [
      ...this.#user.slice(0, index),
      ...this.#user.slice(index + 1),
    ];
  }

  newGame() {
    this.#game = new Game(this);
    return true;
  }

  endGame() {
    this.#game = undefined;
  }
}
