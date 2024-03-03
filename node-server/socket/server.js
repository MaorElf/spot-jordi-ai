import express from "express";
import { Server as SocketServer } from "socket.io";
import cors from 'cors'

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
  console.log("new socket connection");
});

io.on("disconnect", (socket) => {
    console.log("socket disconnect");
  });


app.get('/hello', (req, res) => {
    res.send('hello')
})