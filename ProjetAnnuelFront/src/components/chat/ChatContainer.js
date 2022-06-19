import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import axios from "axios";
import { getSocket } from "../../utils/socket";

export default function ChatContainer({ room }) {
  const socket = getSocket();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleSendMsg = async (msg) => {
    socket.emit("send_message", { msg, room });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  // useEffect(() => {
  //   socket.emit("join_room", room);
  // }, [socket, room]);

  useEffect(() => {
    console.log('In useeffect', socket);
    if (socket) {
      socket.on("receive_message", (msg) => {
        console.log('RECEIVED : ', msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);





  const handleFinish = () => {
    axios({ url: `http://localhost:3003/user/closeChat`, method: 'PUT', withCredentials: true })
    console.log("tot");
  };

  return (
    <Container>
      <div className="chat-header">
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={uuidv4()}>
            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
              <div className="content ">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outlined" type="submit" onClick={handleFinish} color="error">
          Finir la discution
        </Button>
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;