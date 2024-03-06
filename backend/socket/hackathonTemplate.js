import axios from "axios";

const SERVER_ADDRESS = "http://0.0.0.0:8000";
const AGENT_ID = "spot-agent";

export const createThread = async () => {
    const url = `${SERVER_ADDRESS}/threads`
    const {data} = await axios.post(url, {});

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

 export const getMessageUntilCompletion = async (threadId, messageId) => {
    
    return new Promise( (resolve) => {
        const intervalId = setInterval ( async () => {
        
            const url = `${SERVER_ADDRESS}/threads/${threadId}/messages/${messageId}`;
        
            const {data} = await axios.get(url);
        
            if (data.message.completed) {
                clearInterval(intervalId);
                resolve(data.message.content);
            }
        }, 333);
    } )
  
}

export const createAgentReaction = async (store, threadId) => {
    const url = `${SERVER_ADDRESS}/agents/${AGENT_ID}/reactions`
    const body = {
        thread_id: threadId
    };
    
    const config = {headers: {"Content-Type": "application/json"}}
    
    const {data} = await axios.post(url, body, config);
    return await getMessageUntilCompletion(data.reaction.thread_id, data.reaction.message_id);
}
