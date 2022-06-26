import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const Dons = () => {
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //curent page sur laquel on est 
    const [count, setCount] = useState(1); // nombre de pages quil y a 
    const [dons, setDons] = useState([]);



    useEffect(() => {
        axios({ url: `http://localhost:3003/admin/amountStripe`, method: 'GET', withCredentials: true })
            .then((res) => {
                const montant = res.data.pending;
                console.log('montant : ', montant);
                const total = montant[0].amount / 100;
                setTotal(total);
            });
    }, []);

    useEffect(() => {
        axios({ url: `http://localhost:3003/admin/getListAllPayment`, method: 'GET', withCredentials: true })
            .then((data) => {
                setDons(data.data.data)
            });
    }, []);

    useEffect(() => {
        console.log('dons', dons);
    }, [dons]);

    //Pagination : on calcul le count des demandes dans le front, on va avoir combien il va y avoir de pages
    useEffect(() => {
        if (setCount && dons)
            setCount(Math.ceil(dons.length / process.env.REACT_APP_NB_ITEMS_BY_PAGE));
    }, [setCount, dons]);


    return (
        <div>
            <h3>Voici les différents dons qui ont étaient effectués : </h3>
            <h4>Dernier solde total :  {total} €</h4>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Montant</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dons
                        .filter((dons) => dons.customer !== null).map((don) => (
                            <TableRow>
                                <TableCell>{new Date(don.created * 1000).toLocaleString()}</TableCell>
                                <TableCell>{don.customer.name}</TableCell>
                                <TableCell>{don.customer.email}</TableCell>
                                <TableCell>{(don.amount / 100).toLocaleString('fr-FR', { style: "currency", currency: 'EUR' })}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                <Stack spacing={2}>
                    <Pagination page={page} onChange={(e, value) => setPage(value)} count={count} size="large" />
                </Stack>
            </Table>
        </div>
    );
}