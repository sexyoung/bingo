import { Game } from './Game';
import { SocketEvent } from "../src/const";

export const GameHandler = ({ io, socket }) => {
  socket.on(SocketEvent.Game.CheckNum, (room, num) => {
    const checkList = Game.checked(room, num);
    console.warn('checkList', checkList);
    io.in(room).emit(
      SocketEvent.Game.UpdateChecked,
      checkList
    );
  });

  socket.on(SocketEvent.Game.FetchMatrix, room => {
    const checkList = Game.get(room);
    console.warn(socket.id, checkList);
    io.in(room).emit(
      SocketEvent.Game.UpdateChecked,
      checkList
    );
  });
};