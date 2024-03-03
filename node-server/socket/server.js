import express from "express";
import { Server as SocketServer } from "socket.io";

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));
app.use()

// Socket setup
const io = new SocketServer(server);

io.on("connection", (socket) => {
  console.log("Made socket connection");
});


app.get('/hello', (req, res) => {
    res.send('hello')
})