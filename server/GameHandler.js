import { Game } from './Game';
import { SocketEvent } from "../src/const";

export const GameHandler = ({ io, socket }) => {
  socket.on(SocketEvent.Game.CheckNum, (room, num) => {
    const checkList = Game.checked(room, num);
    console.warn(SocketEvent.Game.UpdateChecked);
    console.warn(checkList);
    console.warn(room);
    socket.to(room).emit(
      SocketEvent.Game.UpdateChecked,
      checkList
    );
  });
};