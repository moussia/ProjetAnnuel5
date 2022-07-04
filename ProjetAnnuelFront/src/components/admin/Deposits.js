import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Deposits() {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios({ url: `${process.env.REACT_APP_SERVER}/admin/amountStripe`, method: 'GET', withCredentials: true })
            .then((res) => {
                const montant = res.data.pending;
                const total = montant[0].amount / 100;
                setTotal(total);
            });
    }, []);

    return (
        <React.Fragment>
            <h3>Dernier solde</h3>
            <Typography component="p" variant="h4">
                {total} €
            </Typography>
            <div>
                <Link color="primary" to="/donation">
                    Voir plus de détail
                </Link>
            </div>
        </React.Fragment>
    );
}