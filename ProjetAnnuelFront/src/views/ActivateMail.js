import React, { useContext, useEffect } from 'react';
import * as animationData from '../images/lotties/activateemail.json';
import * as notActivateImage from '../images/lotties/notactivateemail.json';
import * as loader from '../images/lotties/loader.json';
import axios from 'axios';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const loaderoption = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const notactivateEmail = {
    loop: true,
    autoplay: true,
    animationData: notActivateImage,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export const ActivateMail = () => {

    // si jai recu un token, je fais une requete vers le back sur la route quon a creer avec le jwt.verify
    // .then -> jappelle cette route la, si elle me renvoi 200 alors jaffiche le message de succes
    // sinon (.cath) -> affiche l'erreur !
    // decklarer un state activated par defaut a false, si c un succes, je le passe a true.
    // dans mon return : if (activation = success) je return le lotify de succes
    // else ..

    const [activation, setActivation] = React.useState(null);
    const { search } = useLocation(); //permet de recuperer dans l'url
    const navigate = useNavigate();

    React.useEffect(() => {
        const token = new URLSearchParams(search).get('token');

        if (!token) {
            navigate("/");
        }
        else {
            axios({ url: 'http://localhost:3003/user/activatedMail', method: 'POST', data: { token } })
                .then(() => setTimeout(() => setActivation(true), 2000))
                .catch(() => setTimeout(() => setActivation(false), 1500));
        }
    }, [navigate, search]);

    if (activation === true)
        return (
            <div>
                <Lottie options={defaultOptions}
                    height={"10%"}
                    width={"10%"} />
                <p style={{ textAlign: "center" }}>
                    <h1>Merci d'avoir activé votre mail !</h1>

                    <Link to="/login">Connectez-vous</Link>
                </p>
            </div>
        )
    else if (activation === false) {
        return (
            <div>
                <Lottie options={notactivateEmail}
                    height={"10%"}
                    width={"10%"} />
                <p style={{ textAlign: "center" }}>
                    <h1>Une erreur est survenue.</h1>
                    <Link to="/">Accueil</Link>
                </p>
            </div >
        );
    }
    else {
        return (
            <div>
                <Lottie options={loaderoption}
                    height={"40%"}
                    width={"40%"} />
                <p style={{ textAlign: "center" }}>
                </p>
            </div >
        )
    }
}