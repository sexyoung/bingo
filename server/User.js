const list = {};

export class User {

  static get(socketID) {
    return list[socketID];
  }

  static getByID(id) {
    for (const key in list) {
      if(list[key].id === id) {
        return list[key];
      }
    }
    return null;
  }

  static add(socketID, user) {
    user.socketID = socketID;
    list[socketID] = user;
  }

  static remove(socketID) {
    delete list[socketID];
  }
}