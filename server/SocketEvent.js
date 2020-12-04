import { SocketEvent } from "../src/const";

export const Disconnect = ({ io, socket }) => {
  socket.on('disconnect', reson => {
    console.log(`==== ${reson} ====\n`, socket.adapter.rooms);

    for (const room of socket.adapter.rooms) {
      const [id, [...socketList]] = room;
      console.log(id);
      console.log(socketList);
      io.to(id).emit(
        SocketEvent.Room.PlayerUpdate,
        socketList
      );
    }
  });
};