import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import {
  RoomHandler,
  GameHandler,
  UserHandler,
  SocketHandler,
} from "./handlers";

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    // origin: 'https://sexyoung.github.io',
    origin: '*',
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