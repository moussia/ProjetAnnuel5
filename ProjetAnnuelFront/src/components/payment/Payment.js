import axios from "axios";
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Lottie from 'react-lottie';
import * as defaultOptions from '../../images/lotties/37824-payment.json';
import * as animationData from '../../images/lotties/74797-thank-you-with-confetti.json';
import * as animationFail from '../../images/lotties/102132-card-payment-unsuccessful.json';
import styles from '../../style/Payment.module.css';
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const success = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const fail = {
    loop: true,
    autoplay: true,
    animationData: animationFail,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};


export default function Payment() {
    const [amount, setAmount] = useState(20);
    const [message, setMessage] = useState("");
    const [paymentResponse, setPaymentResponse] = useState();
    const { search } = useLocation(); //permet de recuperer dans l'url

    useEffect(() => {
        const query = new URLSearchParams(search);
        setPaymentResponse(query.get('success'));
    }, [search]);

    const checkout = () => {
        axios({ url: `${process.env.REACT_APP_SERVER}/user/payment`, method: 'POST', data: { amount }, withCredentials: true })
            .then((data) => {
                setMessage(data.data);
                window.location.href = data.data;
            })
            .catch((err) => {
                setMessage("Une erreur est survenue, veuillez ressayer ultérieurement.");
            });
    };

    if (paymentResponse === 'true') return (
        <Lottie options={success}
            height={400}
            width={400} />
    )

    else if (paymentResponse === 'false') return (
        <Lottie options={fail}
            height={400}
            width={400} />
    )

    else return (
        <div className={styles.textalign}>
            <h3>Veuillez remplir le montant que vous voulez nous faire don : </h3>
            {message ? (<p>{message}</p>) : (
                <>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField
                            label="Montant"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br></br>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            size="large"
                            onClick={checkout}>
                            Faites un don
                        </Button>
                    </Grid>
                </>
            )}
            <Lottie options={defaultOptions}
                height={400}
                width={400} />
        </div>
    )
}