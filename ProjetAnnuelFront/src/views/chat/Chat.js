import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styled from "styled-components";
// import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../../components/chat/ChatContainer";
import Contacts from "../../components/chat/Contacts";
// import Welcome from "../../components/chat/Welcome";

export default function Chat() {
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => {
        axios({ url: 'http://localhost:3003/pro/contacts', method: 'GET', withCredentials: true })
            .then((res) => setContacts(res.data))
    }, []);

    useEffect(() => {
        console.log(contacts);
    }, [contacts]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} changeChat={handleChatChange} />
                {/* {currentChat === undefined ? (
                        <Welcome />
                    ) : (
                        <ChatContainer currentChat={currentChat} socket={socket} />
                    )} */}
                <ChatContainer currentChat={currentChat} socket={socket} />

            </div>
        </Container>
    );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;