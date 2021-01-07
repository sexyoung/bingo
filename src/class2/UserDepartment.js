let instance = null;

class UserDepartmentSingleton {
  data = {};
  constructor() {
    if(!instance) {
      instance = this;
    }
    return instance;
  }

  new(user) {
    this.data[user.id] = user;
    return user;
  }

  user(id) {
    return this.data[id];
  }
}

export const UserDepartment = new UserDepartmentSingleton();