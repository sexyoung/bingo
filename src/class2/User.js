import { makeID } from "utils";

export class User {
  #id;
  #name;
  #room;

  get id() { return this.#id; }
  get name() { return this.#name; }
  get room() { return this.#room; }

  constructor(name = 'Player', id = makeID()) {
    this.#id = id;
    this.#name = name;
  }

  join(room) {
    this.#room = room;
  }

  leave() {
    this.#room = undefined;
  }

  get winCount() {
    return 0;
  }
}