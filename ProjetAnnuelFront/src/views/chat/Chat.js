import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatContainer from "../../components/chat/ChatContainer";
import { AuthContext } from '../../components/contexts/AuthContext';
import { useSearchParams } from "react-router-dom";
import { getSocket } from "../../utils/socket";

export default function Chat() {
    const socket = getSocket();
    const [contacts, setContacts] = useState([]);
    const { getRole } = React.useContext(AuthContext);
    const [searchParams] = useSearchParams();

    // console.log(socket);

    // socket.on("connect_error", (err) => {
    //     console.log(`connect_error due to ${err.message}`);
    // });

    useEffect(() => {
        console.log(socket, searchParams);
        console.log('socksock', socket);
        if (searchParams && socket) socket.emit("join_room", searchParams.get('id'));
    }, [searchParams, socket]);

    useEffect(() => {
        if (getRole() === 'PRO') {
            axios({ url: 'http://localhost:3003/pro/contacts', method: 'GET', withCredentials: true })
                .then((res) => setContacts(res.data));
        }
        else {
            axios({ url: 'http://localhost:3003/user/contacts', method: 'GET', withCredentials: true })
                .then((res) => setContacts(res.data));
        }
    }, [getRole]);

    return (
        <Container>
            <div className="container">
                <ChatContainer socket={socket} room={searchParams.get('id')} />
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