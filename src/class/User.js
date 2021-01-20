import { SocketEvent } from "const";
import { getRandomChar } from "utils";

// TODO: 這邊有一些方法應集中到另一個 Class Room
export class User {

  /** @deprecated */
  checked(room, num) {
    if(!this.checkedList) {
      this.checkedList = [];
    }
    this.checkedList = [...new Set([...this.checkedList, num])].sort((a, b) => a - b);
    this.socket.emit(
      SocketEvent.Game.CheckNum,
      room,
      num
    );
  }

  /** @deprecated */
  fetchMatrix(room) {
    this.socket.emit(
      SocketEvent.Game.FetchMatrix,
      room
    );
  }

  /** @deprecated */
  replay(room) {
    this.socket.emit(
      SocketEvent.Game.RePlay,
      room,
    );
  }

  /** @deprecated */
  leave() {
    this?.socket.close();
  }
}