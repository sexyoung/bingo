import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import {
  PlayerJoin,
} from "./RoomEvent";

import {
  Disconnect,
} from "./SocketEvent";

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
  socket.emit("connected", socket.rooms);

  PlayerJoin({ io, socket });
  Disconnect({ io, socket });

});

server.listen(4001, () => {
  console.log('listening on *:4001');
});