import { Room, User } from "class2";

// create a new room
const room = new Room('ABCD');
const user1 = new User('sexyoung');
const user2 = new User('kelly');
const user3 = new User('300');
const user4 = new User('空貓');
// console.warn(user.name);

room.invite(user1);
room.invite(user2);
room.invite(user3);
room.invite(user4);

console.warn(room.user.map(({ name }) => name));

room.kick(user3);

console.warn(room.user.map(({ name }) => name));