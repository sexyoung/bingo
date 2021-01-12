import { Room, User, UserDepartment, RoomDepartment } from "class";
import { SocketEvent } from "const";

export const JoinRoomHandler = ({ io, socket }) => {
  const socketID = socket.id;
  socket.on(SocketEvent.Room.PlayerJoin, (roomName, userID) => {
    // 先檢查這個 id 是否有存在room，有的話就不新增
    RoomDepartment.load(roomName);
    const room = RoomDepartment.room(roomName) ?? RoomDepartment.new(new Room({ name: roomName}));

    /** 如果使用者在該房間的話就不允許同id的使用者進來 */
    if(room.existsUser(userID)) {
      return io.to(socketID).emit(
        SocketEvent.Room.Denied
      );
    }

    /** 把每個使用者的資料調出來 */
    room.user.forEach(UserDepartment.load.bind(UserDepartment));

    /** 如果沒有使用者則建立 */
    const user = UserDepartment.user(userID) || new User({id: userID, socketID});
    user.socketID = socketID;
    UserDepartment.new(user);

    /** 加入該使用者並儲存 */
    room.invite(user);
    RoomDepartment.save(roomName);
    UserDepartment.save(userID);

    socket.join(roomName);

    io.in(roomName).emit(
      SocketEvent.Room.PlayerUpdate,
      room.user.map(UserDepartment.user.bind(UserDepartment)).map(({socketID, ...user}) => user),
    );
  });
};