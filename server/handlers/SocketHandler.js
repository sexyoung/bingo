import GameManager from '../GameManager';

import { UserDepartment, RoomDepartment } from "class";

export const SocketHandler = ({ io, socket }) => {
  const socketID = socket.id;
  socket.on('disconnect', reson => {
    console.log(`==== ${reson} ====\n`, reson, socket.id);
    UserDepartment.loadAll();

    const user = UserDepartment.find(socketID);
    if(user) {
      RoomDepartment.loadAll();
      /** 找到使用者在的房間 */
      const roomName = Object.keys(RoomDepartment.data).find(roomName => {
        return RoomDepartment.data[roomName].user.includes(user.id);
      });

      /** 踢出他 */
      const room = RoomDepartment.room(roomName);
      room.kick(user.id);
      RoomDepartment.save(roomName);
    }

    // 該使用者的每個聊天室都要移除該使用者
    for (const room of socket.adapter.rooms) {
      const [id, [...sockets]] = room;
      GameManager.updatePlayer({io, id, sockets});
    }
  });
};