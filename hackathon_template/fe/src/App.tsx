import React, { useEffect, useState } from 'react';
import { create } from 'zustand';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import '@fontsource/inter';

import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';

import Send from '@mui/icons-material/Send';
import SmartToy from '@mui/icons-material/SmartToy';
import Person from '@mui/icons-material/Person';

import './App.css';

type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

interface ChatStore {
  messages: Message[];
  waiting: boolean;
  revision: number;

  setWaiting: (waiting: boolean) => void;
  addUserMessage: (id: string, content: string) => void;
  createAssistantMessage: (id: string) => void;
  updateAssistantMessage: (id: string, content: string) => void;
}

const useStore = create<ChatStore>(set => ({
  messages: [],
  waiting: false,
  revision: 0,

  setWaiting: (waiting: boolean) => {
    set({ waiting });
  },

  addUserMessage: (id: string, content: string) => {
    set(state => ({
      messages: [...state.messages, { id, role: "user", content }],
    }));
  },

  createAssistantMessage: (id: string) => {
    set(state => ({
      messages: [...state.messages, { id, role: "assistant", content: "" }],
    }));
  },

  updateAssistantMessage: (id: string, content: string) => {
    set(state => ({
      messages: state.messages.map(m => (m.id === id) ? { ...m, content } : m),
      revision: state.revision + 1,
    }));
  },
}));

const SERVER_ADDRESS = "http://localhost:8000";
const AGENT_ID = "pizza-agent";

async function createThread() {
  const data = await fetch(SERVER_ADDRESS + "/threads", {
    method: "POST",
  });

  const jsonData = await data.json();

  return jsonData.thread_id;
}

async function createUserMessage(threadId: string, message: string) {
  const data = await fetch(SERVER_ADDRESS + "/threads/" + threadId + "/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      role: "user",
      content: message,
      completed: true,
    }),
  });

  const jsonData = await data.json();

  return jsonData.message.id;
}

function updateMessageUntilCompletion(threadId: string, messageId: string) {
  const intervalId = setInterval(async () => {
    const store = useStore.getState();
    const data = await fetch(SERVER_ADDRESS + "/threads/" + threadId + "/messages/" + messageId);
    const jsonData = await data.json();

    store.updateAssistantMessage(messageId, jsonData.message.content);

    if (jsonData.message.completed) {
      store.setWaiting(false);
      clearInterval(intervalId);
    }
  }, 333);
}

async function createAgentReaction(store: ChatStore, threadId: string) {
  const data = await fetch(SERVER_ADDRESS + "/agents/" + AGENT_ID + "/reactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      thread_id: threadId,
    }),
  });

  const jsonData = await data.json();

  updateMessageUntilCompletion(jsonData.reaction.thread_id, jsonData.reaction.message_id);

  return jsonData.reaction.message_id;
}

function MessageEntry({ message }: { message: Message }) {
  if (!message.content) {
    return null;
  }

  return (
    <Card orientation='horizontal'>
      <CardContent style={{ textAlign: "left" }}>
        <Grid container alignItems="center" spacing={0}>

          <Grid xs={1}>
            <Avatar variant='soft'>{message.role === "assistant" ? <SmartToy /> : <Person />}</Avatar>
          </Grid>

          <Grid xs={11}>
            <p>{message.content}</p>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}

function App() {
  const store = useStore();
  const [message, setMessage] = useState("");
  const [threadId, setThreadId] = useState("");

  useEffect(() => {
    const fetchThreadId = async () => {
      const threadId = await createThread();
      setThreadId(threadId);
    };

    fetchThreadId();
  }, []);

  if (!threadId) {
    return null;
  }

  const sendMessage = async () => {
    setMessage("");
    store.setWaiting(true);
    const userMessageId = await createUserMessage(threadId, message);
    store.addUserMessage(userMessageId, message);
    const agentMessageId = await createAgentReaction(store, threadId);
    store.createAssistantMessage(agentMessageId);
  };

  return (
    <div className="App">
      <Box component="section" sx={{ p: 10, m: "auto", width: "800px" }}>
        <Card>
          <CardContent>
            {store.messages.map(m => (<MessageEntry key={m.id} message={m} />))}
          </CardContent>
          <CardActions>
            <Input
              fullWidth
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder='Enter message...'
              onKeyDown={e => (e.key === 'Enter') && !store.waiting && sendMessage()}
              endDecorator={
                store.waiting ? <CircularProgress size='sm' /> :
                  <IconButton onClick={sendMessage}><Send /></IconButton>
              }
            />
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}

export default App;
