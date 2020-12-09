const UserList = {};
let instance = null;

class UserManager {

  constructor() {
    if(!instance) {
      instance = this;
    }
    return instance;
  }

  /**
   * query is object like
   * {[queryKey]: queryValue}
   */
  get(query) {
    const key = Object.keys(query)[0];
    if(key === 'socketID')
      return UserList[query[key]];

    if(key === 'id') {
      for (const socketID in UserList) {
        if(UserList[socketID].id === query[key]) {
          return UserList[socketID];
        }
      }
    }

    return null;
  }

  add({ socketID, user }) {
    UserList[socketID] = user;
  }

  remove(socketID) {
    delete UserList[socketID];
  }
}

export default new UserManager();