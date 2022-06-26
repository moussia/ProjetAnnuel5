import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Deposits() {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios({ url: `http://localhost:3003/admin/amountStripe`, method: 'GET', withCredentials: true })
            .then((res) => {
                const montant = res.data.pending;
                const total = montant[0].amount / 100;
                setTotal(total);
                console.log(res.data);
            });
    }, []);

    return (
        <React.Fragment>
            <h3>Dernier solde</h3>
            <Typography component="p" variant="h4">
                {total} €
            </Typography>
            {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2019
            </Typography> */}
            <div>
                <Link color="primary" to="/donation">
                    Voir plus de détail
                </Link>
            </div>
        </React.Fragment>
    );
}