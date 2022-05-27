import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './contexts/AuthContext';


const Logout = () => {
    const { setContext } = useContext(AuthContext);

    useEffect(() => {
        axios({ url: 'http://localhost:3003/session', method: 'DELETE', withCredentials: true })
            .then(() => setContext((prev) => ({ role: null, isLoggedIn: false })))
    }, [setContext]);

    return (
        <h1>Vous êtes déconnecté</h1>
    );
};



export default Logout;