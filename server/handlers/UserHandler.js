import GameManager from '../GameManager';
import UserManager from '../UserManager';
import { SocketEvent } from "../../src/const";

export const UserHandler = ({ io, socket }) => {
  const socketID = socket.id;
  socket.on(SocketEvent.User.ChangeName, (room, newName) => {
    const user = UserManager.get({ socketID });
    if(!user) return;
    user.name = newName;
    GameManager.updatePlayer({
      io,
      id: room,
      sockets: [...io.sockets.adapter.rooms.get(room)]
    });
  });
};