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
  setInterval(() => {
    socket.emit("FromAPI", socket.id);
  }, 2000);
});

server.listen(4001, () => {
  console.log('listening on *:4001');
});