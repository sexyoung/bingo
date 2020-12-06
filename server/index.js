import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import { UserHandler } from "./UserHandler";
import { RoomHandler } from "./RoomHandler";
import { GameHandler } from "./GameHandler";
import { SocketHandler } from "./SocketHandler";

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    // origin: [
    //   "http://localhost:3000",
    //   "http://172.20.10.2:3000",
    // ],
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log(`user connect: ${socket.id}`);
  socket.emit("connected", socket.id);

  UserHandler({ io, socket });
  RoomHandler({ io, socket });
  GameHandler({ io, socket });
  SocketHandler({ io, socket });

});

server.listen(4001, () => {
  console.log('listening on *:4001');
});