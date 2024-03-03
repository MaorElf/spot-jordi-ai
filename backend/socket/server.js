import http from "http";
import {Server as SocketServer} from "socket.io";
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

    socket.on('createChat', ({userId, orgId}) => createChatHandler(socket, userId, orgId));
    socket.on('newMessage', ({userId, orgId, message}) => newMessageHandler(socket, userId, orgId, message));
});

io.on("disconnect", (socket) => {
    console.log(`socket: ${socket.id} disconnect`);
});

const createChatHandler = async (socket, userId, orgId) =>
    {
        const chatId = `${userId}-${orgId}`;

        socket.join(chatId);

        let chatObject = await redis.get(chatId);

        if (!chatObject) {
            chatObject = {
                messages: [],
            }

            await addMessage(chatObject, chatId, JORDI, `welcome ${chatId}!`);
        }

        socket.emit('createChat', chatObject);
    };

const newMessageHandler = async (socket, userId, orgId, message) =>
    {
        const chatId = `${userId}-${orgId}`;

        const chatObject = JSON.parse(await redis.get(chatId));

        await addMessage(chatObject, chatId, USER, message);

        socket.emit('newMessage', chatObject);

        const recommendations = await getRecommendations(orgId);

        const GPTAnswer = await getGPTAnswer(recommendations);

        await addMessage(chatObject, chatId, USER, GPTAnswer);

        socket.emit('newMessage', chatObject);
    };

const addMessage = (chatObject, chatId, sender, message) => {
    chatObject.messages.push({sender, message});

    return redis.set(chatId, JSON.stringify(chatObject));
};

const getRecommendations = (orgId) => {
    return ({
        product1: 1,
        product2: 2,
        product3: 3,
    });
};

const getGPTAnswer = (recommendations) => {
    return "This is an answer!";
};
