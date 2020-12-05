import { SocketEvent } from "../src/const";
import { User } from './User';
import { Room } from './Room';


export const PlayerJoin = ({ io, socket }) => {
  socket.on(SocketEvent.Room.PlayerJoin, (room, user) => {
    socket.join(room);
    socket.leave(socket.id);
    User.add(socket.id, user);

    // [room]房裡的所有連線
    const sockets = [...io.sockets.adapter.rooms.get(room)];
    if(sockets.length) {
      Room.updatePlayer({io, id: room, sockets});
    }
  });
};

export const MessageSend = ({ io, socket }) => {
  socket.on(SocketEvent.Room.MessageSend, (room, message) => {
    io.to(room).emit(SocketEvent.Room.MessageUpdate, {
      sender: User.get(socket.id).name,
      text: message,
    });
  });
};