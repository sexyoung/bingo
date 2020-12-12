import GameManager from '../GameManager';
import { SocketEvent } from "../../src/const";

import UserManager from '../UserManager';

export const RoomHandler = ({ io, socket }) => {
  const socketID = socket.id;
  socket.on(SocketEvent.Room.PlayerJoin, (room, user) => {
    // 先檢查這個 id 是否有存在room，有的話就不新增
    if(UserManager.get({ id: user.id })) {
      return io.to(socket.id).emit(
        SocketEvent.Room.Denied
      );
    }

    socket.join(room);
    // socket.leave(socket.id); // 果然不能離開自己的 socketid
    UserManager.add({socketID, user});

    // [room]房裡的所有連線
    const sockets = [...io.sockets.adapter.rooms.get(room)];
    if(sockets.length) {
      GameManager.updatePlayer({io, id: room, sockets});
    }
  });

  socket.on(SocketEvent.Room.MessageSend, (room, message) => {
    io.to(room).emit(SocketEvent.Room.MessageUpdate, {
      sender: UserManager.get({ socketID }).name,
      text: message,
    });
  });

  socket.on(SocketEvent.Room.UpdateProcess, (room, percentage) => {
    UserManager.get({ socketID }).percentage = percentage;
    GameManager.updatePlayer({
      io,
      id: room,
      sockets: [...io.sockets.adapter.rooms.get(room)]
    });
  });

  socket.on(SocketEvent.Room.TriggerStartGame, (room, size, winLine) => {
    // console.warn('all socket in room', [...io.sockets.adapter.rooms.get(room)]);
    GameManager.build({
      size,
      room,
      winLine,
      sockets: [...io.sockets.adapter.rooms.get(room)],
    });
    io.in(room).emit(SocketEvent.Room.StartGame);
  });

  // 把每個人的 matrix 暫存
  socket.on(SocketEvent.Room.SaveMatrix, (room, matrix) => {
    const { idList } = GameManager.get(room);
    const index = idList.findIndex(user => user.id === UserManager.get({ socketID: socket.id }).id);
    idList[index].matrix = matrix;
    GameManager.get(room).idList = idList;
  });
};
