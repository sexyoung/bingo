const gameRoom = {};

export class Game {

  static checked(room, num) {
    if(!gameRoom[room]) {
      gameRoom[room] = [];
    }
    gameRoom[room] = [...new Set([...gameRoom[room], num])];
    gameRoom[room].sort((a, b) => a - b);
    return gameRoom[room];
  }

  static get(room) {
    return gameRoom[room] || [];
  }
}