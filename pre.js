import 'module-alias/register';

import { Room, UserDepartment, User } from "class";

console.clear();

// create a new room
let room = new Room({name: 'ABCD'});

const size = 5;
room.size = size;
room.winLine = 1;

// create users
const user1 = UserDepartment.new(new User({ name: 'sexyoung' }));
const user2 = UserDepartment.new(new User({ name: 'kelly' }));
const user3 = UserDepartment.new(new User({ name: '300' }));
const user4 = UserDepartment.new(new User({ name: '空貓' }));

// // invite users to room
room.invite(user1);
room.invite(user2);
room.invite(user3);
room.invite(user4);

// kick out a someone
room.kick(user3.id);

user1.matrix = [...Array(size ** 2).keys()].map(v => v + 1);

// create game
room.start();

console.warn(room);
room.game.checked(1);
room.game.checked(2);
room.game.checked(3);
room.game.checked(4);
room.game.checked(5); // end

// room.game.restart();
// console.warn(room);

console.warn('=== back ready ===');
room.backReady();
console.warn(room);
user1.matrix = [...Array(size ** 2).keys()].map(v => v + 1);

console.warn('=== start game ===');
room.start();

room.game.checked(1);
room.game.checked(2);
room.game.checked(3);
room.game.checked(4);
room.game.checked(5);