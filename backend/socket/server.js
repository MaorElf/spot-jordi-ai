import http from "http";
import {Server as SocketServer} from "socket.io";
import redis from './redis.js';
import {
    createAgentReaction,
    createThread,
    createUserMessage,
} from "./hackathonTemplate.js";

const JORDI = 'jordi';
const USER = 'user';

const server = http.createServer();

const io = new SocketServer(server, {
    cors: {
        origin: '*',
    }
});

const PORT = 7321;
server.listen(PORT, () => console.info(`Listening on port ${PORT}...`));

io.on("connection", (socket) => {
    console.log("new socket connection: ", socket.id);

    socket.on('createChat', ({userId, orgId, accountId}) => createChatHandler(socket, userId, orgId, accountId));
    socket.on('newMessage', ({userId, orgId, message}) => newMessageHandler(socket, userId, orgId, message));
});

io.on("disconnect", (socket) => {
    console.log(`socket: ${socket.id} disconnect`);
});

const createChatHandler = async (socket, userId, orgId, accountId) => {
        const chatId = `${userId}-${orgId}`;

        socket.join(chatId);

        let chatObject = await redis.get(chatId);

        if (!chatObject) {
            const threadId = await createThread();

            chatObject = {
                messages: [],
                threadId
            }
            
            const messageId = await createUserMessage(chatObject.threadId, "Hi!");
            const jordiMessage = await createAgentReaction(messageId, chatObject.threadId);
            await addMessage(chatObject, chatId, JORDI, jordiMessage);
        }

        socket.emit('createChat', chatObject);
    };

const newMessageHandler = async (socket, userId, orgId, message) =>
    {
        const chatId = `${userId}-${orgId}`;

        const chatObject = JSON.parse(await redis.get(chatId));

        await addMessage(chatObject, chatId, USER, message);

        socket.emit('newMessage', chatObject);

        const messageId = await createUserMessage(chatObject.threadId, message);
        
        const jordiMessage = await createAgentReaction(messageId, chatObject.threadId)
        
        await addMessage(chatObject, chatId, JORDI, jordiMessage);

        socket.emit('newMessage', chatObject);
    };

const addMessage = (chatObject, chatId, sender, message) => {
    chatObject.messages.push({sender, message});

    return redis.set(chatId, JSON.stringify(chatObject));
};

