import { Room, User, UserDepartment, RoomDepartment } from "class";
import { SocketEvent } from "const";
import { writeFile } from "utils";

export const JoinRoomHandler = ({ io, socket }) => {
  const socketID = socket.id;
  socket.on(SocketEvent.JoinRoom.InviteUserRequest, (roomName, userID) => {
    // 先檢查這個 id 是否有存在room，有的話就不新增
    RoomDepartment.load(roomName);
    const room = RoomDepartment.room(roomName) ?? RoomDepartment.new(new Room({ name: roomName}));

    /** 如果使用者在該房間的話就不允許同id的使用者進來 */
    if(room.existsUser(userID)) {
      return io.to(socketID).emit(
        SocketEvent.Room.Denied
      );
    }

    /** load all user from room */
    room.user.forEach(UserDepartment.load.bind(UserDepartment));

    /** if user isn't in data, create it. */
    const user = UserDepartment.user(userID) || new User({id: userID, socketID});
    user.socketID = socketID;
    UserDepartment.new(user);

    room.invite(user);
    RoomDepartment.save(roomName);
    UserDepartment.save(userID);

    socket.join(roomName);

    io.in(roomName).emit(
      SocketEvent.JoinRoom.InviteUserResponse,
      room.user.map(UserDepartment.user.bind(UserDepartment)).map(({socketID, ...user}) => user),
    );
  });
};