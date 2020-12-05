import { SocketEvent } from "../src/const";

export const PlayerJoin = ({ io, socket }) => {
  socket.on(SocketEvent.Room.PlayerJoin, (room) => {
    socket.join(room);
    socket.leave(socket.id);
    const sockets = io.sockets.adapter.rooms.get(room);
    if(sockets) {
      console.log([...sockets]);
      io.to(room).emit(SocketEvent.Room.PlayerUpdate, [...sockets]);
    }
  });
};

export const MessageSend = ({ io, socket }) => {
  socket.on(SocketEvent.Room.MessageSend, (room, message) => {
    io.to(room).emit(SocketEvent.Room.MessageUpdate, message);
  });
};