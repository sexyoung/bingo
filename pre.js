import 'module-alias/register';

import { Room } from "@class";

// create a new room
const room = new Room('abc');

console.log(room.addUser('sexyoung'));