import { User } from './User';
import { SocketEvent } from "../src/const";

export class Room {
  static updatePlayer({io, id, sockets}) {
    // console.warn('====', sockets.map(User.get));
    io.to(id).emit(
      SocketEvent.Room.PlayerUpdate,
      sockets.map(User.get)
    );
  }
}