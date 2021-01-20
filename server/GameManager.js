/** 這檔案遲早要拔 */
import { SocketEvent } from "const";
import { UserDepartment } from "class";

let instance = null;

class GameManager {

  constructor() {
    if(!instance) {
      instance = this;
    }
    return instance;
  }

  updatePlayer({io, id, sockets}) {
    UserDepartment.loadAll();
    io.in(id).emit(
      SocketEvent.Room.PlayerUpdate,
      sockets
        .map(UserDepartment.find.bind(UserDepartment))
        .map(({id, name, matrix}) => ({
          id,
          name,
          percentage: matrix.filter(v => v).length / (matrix.length || 1),
        }))
    );
  }
}

export default new GameManager();