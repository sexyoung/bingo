import { Room, User, Game } from "class2";

console.clear();

// create a new room
const room = new Room('ABCD');

// create users
const user1 = new User('sexyoung');
const user2 = new User('kelly');
const user3 = new User('300');
const user4 = new User('空貓');

// invite users to room
room.invite(user1);
room.invite(user2);
room.invite(user3);
room.invite(user4);

console.warn(room.user.map(({ name }) => name));

// kick out a someone
room.kick(user3);

console.warn(room.user.map(({ name }) => name));

// create game
room.newGame();
console.warn(room.game);

// end game
room.endGame();
console.warn(room.game);