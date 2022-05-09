import { useEffect } from 'react';
import axios from 'axios';


const Logout = ({ Component }) => {

    useEffect(() => {
        axios({ url: 'http://localhost:3003/session', method: 'DELETE', withCredentials: true })
    }, []);

    return (
        <h1>Vous êtes déconnecté</h1>
    );
};



export default Logout;