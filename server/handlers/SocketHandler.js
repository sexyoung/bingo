import { UserDepartment, RoomDepartment } from "class";
import GameManager from '../GameManager';

export const SocketHandler = ({ io, socket }) => {
  const socketID = socket.id;
  socket.on('disconnect', reson => {
    console.log(`==== ${reson} ====\n`, reson, socket.id);
    UserDepartment.loadAll();

    const user = UserDepartment.find(socketID);
    if(user) {
      RoomDepartment.loadAll();
      /** 找到使用者在的房間 */
      const roomID = Object.keys(RoomDepartment.data).find(roomID => {
        return RoomDepartment.data[roomID].user.includes(user.id);
      });

      /** 踢出他 */
      const room = RoomDepartment.room(roomID);
      room.kick(user.id);
      RoomDepartment.save(roomID);

      // 該使用者的每個聊天室都要移除該使用者
      for (const Room of socket.adapter.rooms) {
        const [id, [...sockets]] = Room;
        /** 這傢伙遲早要改掉 */
        GameManager.updatePlayer({io, id, sockets, size: room.size});
      }
    }
  });
};