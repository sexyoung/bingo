import { User } from './User';
import { Room } from './Room';

export const SocketHandler = ({ io, socket }) => {
  socket.on('disconnect', reson => {
    console.log(`==== ${reson} ====\n`, socket.adapter.rooms);

    // 應該也要刪除在 User 裡的名單
    User.remove(socket.id);

    // 該使用者的每個聊天室都要移除該使用者
    for (const room of socket.adapter.rooms) {
      const [id, [...sockets]] = room;
      Room.updatePlayer({io, id, sockets});
    }
  });
};