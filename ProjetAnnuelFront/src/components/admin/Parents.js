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
            <h1>Compte Parent</h1>
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
        </div>
    );
}