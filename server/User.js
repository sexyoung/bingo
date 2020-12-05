const list = {};

export class User {

  static get(socketID) {
    return list[socketID];
  }

  static add(socketID, user) {
    user.socketID = socketID;
    list[socketID] = user;
  }

  static remove(socketID) {
    delete list[socketID];
  }
}