import GameManager from '../GameManager';
import { SocketEvent } from "../../src/const";

export const GameHandler = ({ io, socket }) => {
  socket.on(SocketEvent.Game.CheckNum, (room, num) => {
    const checkList = GameManager.checked(room, num);
    console.warn('checkList', checkList);
    io.in(room).emit(
      SocketEvent.Game.UpdateChecked,
      checkList
    );
  });

  socket.on(SocketEvent.Game.FetchMatrix, room => {
    const checkList = GameManager.get(room);
    io.in(room).emit(
      SocketEvent.Game.UpdateChecked,
      checkList
    );
  });
};