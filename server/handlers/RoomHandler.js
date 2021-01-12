import GameManager from '../GameManager';
import UserManager from '../UserManager';
import { SocketEvent } from "const";

import { Room, User, UserDepartment, RoomDepartment } from "class";

const count = 3;
const RoomCount = {};
const RoomInterval = {};

export const RoomHandler = ({ io, socket }) => {
  const socketID = socket.id;

  /** 使用者加入 */
  socket.on(SocketEvent.Room.PlayerJoin, (roomID, userID) => {
    // 先檢查這個 id 是否有存在room，有的話就不新增
    RoomDepartment.load(roomID);
    const room = RoomDepartment.room(roomID) ?? RoomDepartment.new(new Room({ name: roomName}));

    /** 如果使用者在該房間的話就不允許同id的使用者進來 */
    if(room.existsUser(userID)) {
      console.warn('Room.Denied');
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
    RoomDepartment.save(roomID);
    UserDepartment.save(userID);

    socket.join(roomID);

    io.to(socketID).emit(
      SocketEvent.User.InfoRes,
      user,
    );

    /** TODO: 應該可以用 io.in 取代 */
    const sockets = [...io.sockets.adapter.rooms.get(roomID)];
    if(sockets.length) {
      GameManager.updatePlayer({io, id: roomID, sockets});
    }
    // io.in(roomID).emit(
    //   SocketEvent.Room.PlayerUpdate,
    //   room.user.map(UserDepartment.user.bind(UserDepartment)).map(({socketID, ...user}) => user),
    // );

    // [room]房裡的所有連線
    // const sockets = [...io.sockets.adapter.rooms.get(room)];
    // if(sockets.length) {
    //   GameManager.updatePlayer({io, id: room, sockets});
    // }
  });

  socket.on(SocketEvent.Room.InfoReq, roomID => {
    RoomDepartment.load(roomID);
    io.to(roomID).emit(
      SocketEvent.Room.InfoRes,
      RoomDepartment.data[roomID],
    );
  });

  /** 傳訊息 */
  socket.on(SocketEvent.Room.MessageSend, (room, message) => {
    const user = UserManager.get({ socketID });
    if(!user) return;
    io.to(room).emit(SocketEvent.Room.MessageUpdate, {
      user:  UserManager.get({ socketID }),
      text: message,
    });
  });

  /** 更新進度 */
  socket.on(SocketEvent.Room.UpdateProcess, (room, percentage) => {
    const user = UserManager.get({ socketID });
    if(!user) return;
    UserManager.get({ socketID }).percentage = percentage;
    GameManager.updatePlayer({
      io,
      id: room,
      sockets: [...io.sockets.adapter.rooms.get(room)]
    });
  });

  /** 倒數計時 */
  socket.on(SocketEvent.Room.TriggerCountDown, room => {
    RoomCount[room] = count;
    io.in(room).emit(SocketEvent.Room.CountDown, RoomCount[room]);
    RoomInterval[room] = setInterval(() => {
      --RoomCount[room];
      if(RoomCount[room] < 0) {
        clearInterval(RoomInterval[room]);
        io.in(room).emit(SocketEvent.Room.CountDownEnd);
      } else {
        io.in(room).emit(SocketEvent.Room.CountDown, RoomCount[room]);
      }
    }, 1000);
  });

  /** 倒數計時取消 */
  socket.on(SocketEvent.Room.CountDownCancel, room => {
    clearInterval(RoomInterval[room]);
    io.in(room).emit(SocketEvent.Room.CountDownStop);
  });

  /** 觸發開始遊戲 */
  socket.on(SocketEvent.Room.TriggerStartGame, (room, size, winLine) => {
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
    const game = GameManager.get(room);
    if(!game) return;
    const { idList } = GameManager.get(room);
    const index = idList.findIndex(user => user.id === UserManager.get({ socketID: socket.id }).id);
    idList[index].matrix = matrix;
    GameManager.get(room).idList = idList;
  });
};
