import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import { SocketEvent } from "../src/const";

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

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit("connected", socket.rooms);

  socket.on('create', (room) => {
    socket.join(room);
    socket.leave(socket.id);
    console.log([...io.sockets.adapter.rooms.get('abc')]);
    io.to(room).emit(SocketEvent.Room.PlayerUpdate, [...io.sockets.adapter.rooms.get('abc')]);
  });

  socket.on(SocketEvent.Room.PlayerJoin, (room, userID) => {
    socket.join(room);
    socket.leave(socket.id);
    console.log([...io.sockets.adapter.rooms.get('abc')]);
    io.to(room).emit(SocketEvent.Room.PlayerUpdate, [...io.sockets.adapter.rooms.get('abc')]);
  });

  socket.on('disconnect', reson => {
    console.log('==== disconnect ====', socket.id);
    console.log('reson', reson);
  });
});

server.listen(4001, () => {
  console.log('listening on *:4001');
});