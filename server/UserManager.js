export class UserManager {
  constructor() {
    this.item = {};
  }
  get({ queryType, queryData }) {
    if(queryType === 'socket')
      return this.item[queryData];
    if(queryType === 'id') {
      for (const key in this.item) {
        if(this.item[key].id === id) {
          return this.item[key];
        }
      }
    }
    return null;
  }

  add({ socketID, user }) {
    this.item[socketID] = user;
  }

  remove(socketID) {
    delete this.item[socketID];
  }
}