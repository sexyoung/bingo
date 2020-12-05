import { User } from './User';
import { SocketEvent } from "../src/const";

export class Room {
  static updatePlayer({io, id, sockets}) {
    io.to(id).emit(
      SocketEvent.Room.PlayerUpdate,
      sockets.map(User.get)
    );
  }
}