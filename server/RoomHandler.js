import { SocketEvent } from "../src/const";
import { User } from './User';
import { Room } from './Room';
import { Game } from './Game';

export const RoomHandler = ({ io, socket }) => {
  socket.on(SocketEvent.Room.PlayerJoin, (room, user) => {

    // 先檢查這個 id 是否有存在，有的話就不新增
    if(User.getByID(user.id)) {
      return io.to(socket.id).emit(
        SocketEvent.Room.Denied
      );
    }

    socket.join(room);
    socket.leave(socket.id);
    User.add(socket.id, user);

    // [room]房裡的所有連線
    const sockets = [...io.sockets.adapter.rooms.get(room)];
    if(sockets.length) {
      Room.updatePlayer({io, id: room, sockets});
    }
  });

  socket.on(SocketEvent.Room.MessageSend, (room, message) => {
    io.to(room).emit(SocketEvent.Room.MessageUpdate, {
      sender: User.get(socket.id).name,
      text: message,
    });
  });

  socket.on(SocketEvent.Room.UpdateProcess, (room, percentage) => {
    User.get(socket.id).percentage = percentage;
    Room.updatePlayer({
      io,
      id: room,
      sockets: [...io.sockets.adapter.rooms.get(room)]
    });
  });

  socket.on(SocketEvent.Room.TriggerStartGame, room => {
    // console.warn('all socket in room', [...io.sockets.adapter.rooms.get(room)]);
    Game.build({
      room,
      sockets: [...io.sockets.adapter.rooms.get(room)],
    });
    io.in(room).emit(SocketEvent.Room.StartGame);
  });
};
