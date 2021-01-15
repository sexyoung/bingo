import GameManager from '../GameManager';
import UserManager from '../UserManager';
import { SocketEvent } from "const";

import { Room, User, UserDepartment, RoomDepartment } from "class";

const count = 1;
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
      GameManager.updatePlayer({io, id: roomID, sockets, size: room.size});
    }
  });

  /** 取得房間資訊 */
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

  /** 更新進度, 先等等。 */
  socket.on(SocketEvent.Room.UpdateProcess, (roomID, matrix, percentage) => {
    UserDepartment.loadAll();
    const user = UserDepartment.find(socketID);
    if(!user) return;
    UserDepartment.user(user.id).matrix = matrix;
    UserDepartment.user(user.id).percentage = percentage;
    UserDepartment.save(user.id);
    // UserManager.get({ socketID }).percentage = percentage;
    GameManager.updatePlayer({
      io,
      id: roomID,
      sockets: [...io.sockets.adapter.rooms.get(roomID)]
    });
  });

  /** 倒數計時 */
  socket.on(SocketEvent.Room.TriggerCountDown, roomID => {
    RoomCount[roomID] = count;
    io.in(roomID).emit(SocketEvent.Room.CountDown, RoomCount[roomID]);
    RoomInterval[roomID] = setInterval(() => {
      --RoomCount[roomID];
      if(RoomCount[roomID] < 0) {
        clearInterval(RoomInterval[roomID]);
        io.in(roomID).emit(SocketEvent.Room.CountDownEnd);
      } else {
        io.in(roomID).emit(SocketEvent.Room.CountDown, RoomCount[roomID]);
      }
    }, 1000);
  });

  /** 倒數計時取消 */
  socket.on(SocketEvent.Room.CountDownCancel, roomID => {
    clearInterval(RoomInterval[roomID]);
    io.in(roomID).emit(SocketEvent.Room.CountDownStop);
  });

  /** 觸發開始遊戲 */
  socket.on(SocketEvent.Room.TriggerStartGame, roomID => {
    RoomDepartment.load(roomID);
    const room = RoomDepartment.room(roomID);
    room.start();
    RoomDepartment.save(roomID);
    io.in(roomID).emit(SocketEvent.Room.StartGame);
  });
};
