import { Room } from './Room';

export const Disconnect = ({ io, socket }) => {
  socket.on('disconnect', reson => {
    // console.log(`==== ${reson} ====\n`, socket.adapter.rooms);

    // 該使用者的每個聊天室都要移除該使用者
    for (const room of socket.adapter.rooms) {
      const [id, [...sockets]] = room;
      Room.updatePlayer({io, id, sockets});
    }
  });
};