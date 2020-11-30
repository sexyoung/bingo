import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(() => {
    socket.emit("FromAPI", new Date().toLocaleTimeString());
  }, 1000);
});

server.listen(4001, () => {
  console.log('listening on *:4001');
});