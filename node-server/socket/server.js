import express from "express";
import { Server as SocketServer } from "socket.io";
import cors from 'cors'
import redis from './redis.js';

// App setup
const PORT = 5000;
const app = express();

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(cors());

// Socket setup
const io = new SocketServer(server,{
    cors: {
      origin: '*',
    }
  });

io.on("connection", (socket) => {
    console.log("new socket connection: ", socket.id);
    socket.on('createRoom', ({name, org}) => {
        console.log(name, org)
        // socket.join(roomName);
        // console.log(`User joined room: ${roomName}`);
      });
    // redis.set()
});

io.on("disconnect", (socket) => {
    console.log("socket disconnect");
  });


app.get('/hello', (req, res) => {
    res.send('hello')
})

app.get('/redis/:userId', (req, res) => {
    // const userId = req.params.userId;
    // redis.get(userId)
})
