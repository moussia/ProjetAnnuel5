import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatContainer from "../../components/chat/ChatContainer";
import { useSearchParams } from "react-router-dom";
import { getSocket } from "../../utils/socket";
import request from "../../utils/request";

export default function Chat() {
    const socket = getSocket();
    const [searchParams] = useSearchParams();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (searchParams && socket) {
            request.get(`/user/isChatExist/${searchParams.get('id')}`)
                .then((data) => {
                    setAuthorized(data.data);
                });
        };
    }, [searchParams, socket]);

    useEffect(() => {
        if (authorized) socket.emit("join_room", searchParams.get('id'));
        // eslint-disable-next-line
    }, [authorized]);

    return (
        <Container>
            <div className="container">
                {
                    authorized ? <ChatContainer socket={socket} room={searchParams.get('id')} />
                        :
                        <p>Ce chat n'est pas disponible.</p>
                }

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
  background-color: white;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: white;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;