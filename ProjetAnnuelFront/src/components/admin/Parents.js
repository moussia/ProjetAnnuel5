import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles'; // TODO replace
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Drawer, ListItems } from './drower/ListItems';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';



const useStyles = makeStyles((theme) => ({
    tailleeye: {
        width: '25px',
        cursor: 'pointer',
    },
    fixedHeight: {
        height: 240,
    },
}));

export const Parents = () => {
    const classes = useStyles();
    const [parent, setParent] = useState([]);
    const [page, setPage] = useState(1); //curent page sur laquel on est 
    const [count, setCount] = useState(1); // nombre de pages quil y a 
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        axios({ url: 'http://localhost:3003/admin/parents', method: 'GET', withCredentials: true })
            .then((data) => setParent(data.data))
    }, []);

    //on calcul le count des demandes dans le front, on va avoir combien il va y avoir de pages
    useEffect(() => {
        if (setCount && parent)
            setCount(Math.ceil(parent.length / process.env.REACT_APP_NB_ITEMS_BY_PAGE));
    }, [setCount, parent]);

    const deleteParent = async (id) => {
        const res = await axios({ url: `http://localhost:3003/admin/parent/${id}`, method: 'DELETE', withCredentials: true }
        );
        if (res.status === 204)
            setParent((prev) => [...prev.filter((item) => item._id !== id)]);
    };

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
                                    <h3>Parents</h3>

                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nom</TableCell>
                                                <TableCell>Prénom</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Téléphone</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {parent
                                                .slice((page - 1) * process.env.REACT_APP_NB_ITEMS_BY_PAGE, (page * process.env.REACT_APP_NB_ITEMS_BY_PAGE))
                                                .map((parent) => (
                                                    <TableRow key={parent._id}>

                                                        <TableCell>
                                                            {parent.lastname}
                                                        </TableCell>
                                                        <TableCell>{parent.firstname}</TableCell>
                                                        <TableCell>{parent.email}</TableCell>
                                                        <TableCell>{parent.phone}</TableCell>
                                                        <TableCell>
                                                            <Link onClick={() => navigate(`/parent/${parent._id}`)}>
                                                                <img src={require('../../images/eye.png')} alt="traitement" className={classes.tailleeye} />
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Link onClick={() => deleteParent(parent._id)}>
                                                                <img src={require('../../images/poubelle-de-recyclage.png')} alt="traitement" className={classes.tailleeye} />
                                                            </Link>
                                                        </TableCell>
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