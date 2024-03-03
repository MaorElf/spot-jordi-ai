import express from "express";
import { Server as SocketServer } from "socket.io";
import cors from 'cors'
import redis from './redis.js';

// App setup
const PORT = 5000;
const app = express();
const JORDI = 'jordi'
const USER = 'user'

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(cors());

// Socket setup
const io = new SocketServer(server, {
    cors: {
        origin: '*',
    }
});

io.on("connection", (socket) => {
    console.log("new socket connection: ", socket.id);

    socket.on('createChat', async ({ userId, orgId }) => {
        const chatId = `${userId}-${orgId}`;

        socket.join(chatId);

        let chatObject = await redis.get(chatId)

        if (chatObject == null) {
            chatObject = {
                messages: [],
            }

            await addMessage(chatObject, chatId, JORDI, `welcome ${chatId}!`)
        }

        socket.emit('createChat', chatObject);
    });

    socket.on('newMessage', async ({ userId, orgId, message }) => {
        const chatId = `${userId}-${orgId}`;
        const chatObjectStringify = await redis.get(chatId);
        const chatObject = JSON.parse(chatObjectStringify);

        await addMessage(chatObject, chatId, USER, message)
        socket.emit('newMessage', chatObject);

        // Run Backend Service


    })
});

io.on("disconnect", (socket) => {
    console.log("socket disconnect");
});


app.get('/hello', (req, res) => {
    res.send('hello')
})

app.get('/redis/:roomId', async (req, res) => {
    const roomId = req.params.roomId;
    const roomObject = await redis.get(roomId)
    res.json(roomObject)

})

app.get('/redis/init/:roomId', async (req, res) => {
    const roomId = req.params.roomId;
    await redis.set(roomId, null);
    res.end()
})


const addMessage = (chatObject, chatId, sender, message) => {
    chatObject.messages.push({ sender, message })

    return redis.set(chatId, JSON.stringify(chatObject));
}
