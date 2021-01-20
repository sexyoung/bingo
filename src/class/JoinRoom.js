/** @deprecated */
import { Room } from "./Room";
import { GameRoom } from "./Game";
import { randMatrix } from 'utils';

export class JoinRoom extends Room {

  /** @deprecated */
  setSize(size) { this.size = size; }

  /** @deprecated */
  setWinLine(winLine) { this.winLine = winLine; }

  invite(user) {
    if(!this.size) throw('not set size');
    if(!this.winLine) throw('not set winLine');

    if(this.existsUser(user.id)) return false;

    if(!user.matrix.length) {
      user.matrix = randMatrix(this.size);
    }

    this.user.push(user.id);
    return true;
  }

  kick(userID) {
    const index = this.user.findIndex(uid => uid === userID);
    if(index === -1) return;
    this.user = [
      ...this.user.slice(0, index),
      ...this.user.slice(index + 1),
    ];
  }

  start() {
    // 應檢查人數與size
    if(!this.size) throw('size');
    if(!this.user.length) throw('user');

    this.user.forEach(({ matrix }) => {
      if(matrix.length !== this.size ** 2) throw('matrix');
    });
    return new GameRoom(this);
  }
}