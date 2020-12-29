export class Room {
  constructor(name) {
    this.user = [];
    this.game = null;
    this.name = name;
  }
}

Room.prototype.addUser = function (user) {
  this.user.push(user);
  return true;
};

Room.prototype.newGame = function () {
  // new Game();
  return true;
};