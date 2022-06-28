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
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Drawer, ListItems } from './drower/ListItems';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export const Dons = () => {
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //curent page sur laquel on est 
    const [count, setCount] = useState(1); // nombre de pages quil y a 
    const [dons, setDons] = useState([]);
    // const [open, setOpen] = React.useState(true);
    // const toggleDrawer = () => {
    //     setOpen(!open);
    // };

    useEffect(() => {
        axios({ url: `http://localhost:3003/admin/amountStripe`, method: 'GET', withCredentials: true })
            .then((res) => {
                const montant = res.data.pending;
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
            <Box sx={{ display: 'flex' }}>


                <Box
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >




                                    <h3>Dons</h3>
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
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </div>
    );
}