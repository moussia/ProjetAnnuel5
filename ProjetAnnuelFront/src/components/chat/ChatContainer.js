import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import axios from "axios";
import { getSocket } from "../../utils/socket";

export default function ChatContainer({ room }) {
  const socket = getSocket();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleSendMsg = async (msg) => {
    socket.emit("send_message", { msg, room });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    console.log('In useeffect', socket);
    if (socket && room) {
      socket.on("receive_message", (msg) => {
        console.log('receive_message : ', msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
      socket.on("closed", () => {
        setIsChatOpen(false);
        socket.emit("leave_room", room);
        console.log('closed');
      });
    }
  }, [socket, room]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleFinish = () => {
    axios({ url: `http://localhost:3003/user/closeChat`, data: { reservationId: room }, method: 'PUT', withCredentials: true })
      .then(() => {
        socket.emit("leave_room", room);
        setIsChatOpen(false);
      }
      );

  };

  return (
    <Container>
      <div className="chat-header">
        {
          isChatOpen ?
            (
              <>
                <p className="textalign">🟢 Connecté</p>
                <Button variant="outlined" type="submit" onClick={handleFinish} color="error">
                  Terminé la discussion
                </Button>
              </>
            )
            :
            <p className="textalign"> 🔴 Déconnecté</p>
        }



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
      </div>

      {isChatOpen && <ChatInput handleSendMsg={handleSendMsg} />}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  width: 85vw;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .textalign{
    text-align: center;
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
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5rem;
        font-size: 1rem;
        color: white;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #133833;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #ECECEC;
      }
    }
  }
`;