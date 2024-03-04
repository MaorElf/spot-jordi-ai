import axios from "axios";

const SERVER_ADDRESS = "http://localhost:8000";

export const createThread = async () => {
    const {data} = await axios.post(SERVER_ADDRESS + "/threads", {});

    return data.thread_id;
}

export const createUserMessage = async (threadId, message) => {
    const body = {
        role: "user",
        content: message,
        completed: true,
    };

    const config = {
        headers: { "Content-Type": "application/json" }
    };

    const {data} = await axios.post(`${SERVER_ADDRESS}/threads/${threadId}/messages`, body, config);

    return data.message.id;
}
