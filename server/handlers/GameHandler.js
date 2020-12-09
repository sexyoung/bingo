import GameManager from '../GameManager';
import { SocketEvent } from "../../src/const";

export const GameHandler = ({ io, socket }) => {
  socket.on(SocketEvent.Game.CheckNum, (room, num) => {
    const checkedList = GameManager.checked(room, num);
    const { turnIndex, idList } = GameManager.get(room);
    io.in(room).emit(
      SocketEvent.Game.UpdateChecked,
      checkedList,
      idList[turnIndex],
    );
  });

  socket.on(SocketEvent.Game.FetchMatrix, room => {
    const { checkedList, turnIndex, idList } = GameManager.get(room);
    io.in(room).emit(
      SocketEvent.Game.UpdateChecked,
      checkedList,
      idList[turnIndex],
    );
  });
};