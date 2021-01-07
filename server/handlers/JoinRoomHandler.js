import { JoinRoom, JoinUser } from "class";
import { SocketEvent } from "const";
import { readFile, writeFile } from "../utils";

export const JoinRoomHandler = ({ io, socket }) => {
  const socketID = socket.id;
  socket.on(SocketEvent.JoinRoom.InviteUserRequest, (room, userID) => {
    // 先檢查這個 id 是否有存在room，有的話就不新增

    const dataRoom = readFile('room');
    const dataUser = readFile('user');

    const joinRoom = new JoinRoom(dataRoom[room]);

    /** if user isn't in data, create it. */
    if(!dataUser[userID]) {
      dataUser[userID] = new JoinUser({id: userID, socketID});
    }

    const user = dataUser[userID];
    if(joinRoom.existsUser(user.id)) {
      return io.to(socketID).emit(
        SocketEvent.Room.Denied
      );
    }

    joinRoom.invite(user);

    dataRoom[room] = joinRoom;

    writeFile('room', dataRoom);
    writeFile('user', dataUser);

    socket.join(room);

    io.in(room).emit(
      SocketEvent.JoinRoom.InviteUserResponse,
      joinRoom.user,
    );
  });
};