import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

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

  socket.on('create', room => {
    socket.join(room);
    console.log('create and join room', socket.id);
  });

  socket.on('joinRequest', (room, userID) => {
    socket.join(room);
    console.log('join!!!', userID);
    io.to(room).emit('joinResponse', userID);
  });
});

server.listen(4001, () => {
  console.log('listening on *:4001');
});