import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    // useEffect(() => {
    //     const res = axios({ url: `http://localhost:3003/admin/amountStripe`, method: 'GET', withCredentials: true });
    //     console.log("res-> ", res);
    // }, []);

    return (
        <React.Fragment>
            <h3>Dernier solde</h3>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Voir plus
                </Link>
            </div>
        </React.Fragment>
    );
}