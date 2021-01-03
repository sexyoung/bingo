import 'module-alias/register';

import { JoinUser, JoinRoom } from "class";

console.clear();

// create a new room
let joinRoom = new JoinRoom({name: 'ABCD'});

const size = 5;
joinRoom.setSize(size);
joinRoom.setWinLine(1);

// create users
const user1 = new JoinUser({ name: 'sexyoung' });
const user2 = new JoinUser({ name: 'kelly' });
const user3 = new JoinUser({ name: '300' });
const user4 = new JoinUser({ name: '空貓' });

// invite users to room
joinRoom.invite(user1);
joinRoom.invite(user2);
joinRoom.invite(user3);
joinRoom.invite(user4);

// console.warn(joinRoom.user.map(({ name }) => name));

// kick out a someone
joinRoom.kick(user3);
// console.warn(joinRoom);

user1.setMatrix([...Array(size ** 2).keys()].map(v => v + 1));

// create game
let gameRoom = joinRoom.start();

console.warn(gameRoom);
gameRoom.checked(1);
gameRoom.checked(2);
gameRoom.checked(3);
gameRoom.checked(4);
gameRoom.checked(5); // end

// gameRoom.restart();
// console.warn(gameRoom);

console.warn('=== back ready ===');
joinRoom = gameRoom.backReady();
console.warn(joinRoom);
joinRoom.user[0].setMatrix([...Array(size ** 2).keys()].map(v => v + 1));

console.warn('=== start game ===');
gameRoom = joinRoom.start();
gameRoom.checked(1);
gameRoom.checked(2);
gameRoom.checked(3);
gameRoom.checked(4);
gameRoom.checked(5);
console.warn(gameRoom);
// end game
// game.end();
// console.warn(game);


// const room2 = new JoinRoom('XYZ1');