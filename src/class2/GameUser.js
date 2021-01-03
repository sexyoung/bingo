import { User } from "./User";
import { randMatrix } from 'utils';

export class GameUser extends User {

  // room = null;
  winCount = 0;

  constructor(name, id, matrix) {
    super(name, id);
    this.matrix = matrix;
  }

  updateWinCount({ checkedList, winStr, size }) {
    const result = checkedList
      .map(num => this.matrix.findIndex(v => v === num))
      .reduce((result, index) =>
        result.replace(new RegExp(`,${index},`, 'g'), ',,')
      , winStr)
      .match(new RegExp(`${','.repeat(size + 1)}`, 'g'));
    this.winCount = result ? result.length: 0;
  }
}