import http from "http";
import { Server as SocketServer } from "socket.io";
import redis from './redis.js';

const JORDI = 'jordi';
const USER = 'user';

const server = http.createServer();

const io = new SocketServer(server, {
    cors: {
        origin: '*',
    }
});

const PORT = 5000;
server.listen(PORT, () => console.info(`Listening on port ${PORT}...`));

io.on("connection", (socket) => {
    console.log("new socket connection: ", socket.id);

    socket.on('createChat', async ({ userId, orgId }) => {
        const chatId = `${userId}-${orgId}`;

        socket.join(chatId);

        let chatObject = await redis.get(chatId);

        if (chatObject == null) {
            chatObject = {
                messages: [],
            }

            await addMessage(chatObject, chatId, JORDI, `welcome ${chatId}!`);
        }

        socket.emit('createChat', chatObject);
    });

    socket.on('newMessage', async ({ userId, orgId, message }) => {
        const chatId = `${userId}-${orgId}`;
        const chatObjectStringify = await redis.get(chatId);
        const chatObject = JSON.parse(chatObjectStringify);

        await addMessage(chatObject, chatId, USER, message);
        socket.emit('newMessage', chatObject);

        // Run Backend logic

        // Get model suggestions

        // Get GPT answer

        // await addMessage(chatObject, chatId, USER, message)
        // socket.emit('newMessage', chatObject);

    })
});

io.on("disconnect", (socket) => {
    console.log("socket disconnect");
});

const addMessage = (chatObject, chatId, sender, message) => {
    chatObject.messages.push({ sender, message });

    return redis.set(chatId, JSON.stringify(chatObject));
}
