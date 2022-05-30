import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import * as animationData from '../images/lotties/404.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export class NotFoundPage extends React.Component {
    render() {
        return <div>
            <Lottie options={defaultOptions}
                height={400}
                width={400} />
            <p style={{ textAlign: "center" }}>
                <Link to="/">Retourner sur l'accueil</Link>
            </p>
        </div>;
    }
};