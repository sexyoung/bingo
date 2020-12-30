export class Game {
  #room;
  #size;      // number
  #winLine;   // number
  #turnIndex; // player index?
  #checkList; // number[]
  get room() { return this.#room; }
  get size() { return this.#size; }
  get winLine() { return this.#winLine; }
  get turnIndex() { return this.#turnIndex; }
  get checkList() { return this.#checkList; }

  constructor(room) {
    this.#room = room;
  }

  checked(num) {
    /**
     * 影響所有玩家的matrix
     * checkList 也要新增
     */
  }
}