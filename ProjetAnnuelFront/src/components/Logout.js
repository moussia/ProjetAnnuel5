import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './contexts/AuthContext';
import Lottie from 'react-lottie';
import * as animationData from '../images/lotties/good-by.json';
import { Link } from 'react-router-dom';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Logout = () => {
    const { setContext } = useContext(AuthContext);

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_SERVER}/session`, method: 'DELETE', withCredentials: true
        })
            .then(() => setContext((prev) => ({ role: null, isLoggedIn: false })))
    }, [setContext]);

    return (
        <div>
            <Lottie options={defaultOptions}
                height={"50%"}
                width={"50%"} />
            <p style={{ textAlign: "center" }}>
                <Link to="/">Retourner sur l'accueil</Link>
            </p>
        </div>
    );
};



export default Logout;