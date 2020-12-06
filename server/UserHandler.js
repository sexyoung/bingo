import { User } from './User';
import { Room } from './Room';
import { SocketEvent } from "../src/const";

export const UserHandler = ({ io, socket }) => {
  socket.on(SocketEvent.User.ChangeName, (room, newName) => {
    User.get(socket.id).name = newName;
    Room.updatePlayer({
      io,
      id: room,
      sockets: [...io.sockets.adapter.rooms.get(room)]
    });
  });
};