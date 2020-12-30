import { makeID } from "utils";

export class User {
  #id;
  #name;
  #room;
  #matrix = [];

  get id() { return this.#id; }
  get name() { return this.#name; }
  get room() { return this.#room; }
  get matrix() { return this.#matrix; }

  constructor(name = 'Player', id = makeID()) {
    this.#id = id;
    this.#name = name;
  }

  // 通知這個房間的所有人
  join(room) {
    this.#room = room;
  }

  // 通知這個房間的所有人
  leave() {
    this.#room = undefined;
  }

  // 要通知所有房間的人
  rename(name) {
    this.#name = name;
  }

  // 要通知所有房間的人
  sendMessage(message) {
    console.warn(message);
  }

  get winCount() {
    return 0;
  }
}