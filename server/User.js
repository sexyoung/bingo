const userList = {};

export class User {

  static get(socketID) {
    return userList[socketID];
  }

  static getByID(id) {
    for (const key in userList) {
      if(userList[key].id === id) {
        return userList[key];
      }
    }
    return null;
  }

  static add(socketID, user) {
    user.socketID = socketID;
    userList[socketID] = user;
  }

  static remove(socketID) {
    delete userList[socketID];
  }
}