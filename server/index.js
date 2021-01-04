import 'module-alias/register';

import http from 'http';
import cors from 'cors';
import express from 'express';
import socketIO from 'socket.io';

import { JoinRoom } from "class";
import { getRandomChar } from "utils";

import { readFile, writeFile } from "./utils";

import {
  RoomHandler,
  GameHandler,
  UserHandler,
  SocketHandler,
  JoinRoomHandler,
} from "./handlers";

const app = express();
const server = http.createServer(app);

const corsOption = {
  // origin: 'https://sexyoung.github.io',
  origin: '*',
};

const io = socketIO(server, {
  cors: corsOption
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/new-room', cors(corsOption), (req, res) => {
  const dataRoom = readFile('room');
  let name;
  do {
    name = getRandomChar(4);
  } while (dataRoom[name]);

  // 要小心重複
  const joinRoom = new JoinRoom({ name });
  dataRoom[name] = joinRoom;
  writeFile('room', dataRoom);
  res.json(name);
});

io.on('connection', socket => {
  console.log(`user connect: ${socket.id}`);
  socket.emit("connected", socket.id);

  UserHandler({ io, socket });
  RoomHandler({ io, socket });
  GameHandler({ io, socket });
  JoinRoomHandler({ io, socket });
  SocketHandler({ io, socket });

});

server.listen(4001, () => {
  console.log('listening on *:4001');
});