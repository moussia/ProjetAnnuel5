import React, { useState } from 'react';
import { makeStyles } from '@mui/styles'; // TODO replace
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles((theme) => ({
    fixedHeight: {
        height: 240,
    },
    tailleeye: {
        width: '25px',
        cursor: 'pointer',
    },
}));


export const Demandes = () => {
    const classes = useStyles();
    const [demandes, setDemandes] = useState([]);
    const [page, setPage] = useState(1); //curent page sur laquel on est 
    const [count, setCount] = useState(1); // nombre de pages quil y a 


    useEffect(() => {
        axios({ url: `http://localhost:3003/admin/getAllDemandes`, method: 'GET', withCredentials: true })
            .then((data) => setDemandes(data.data))
    }, []);

    //on calcul le count des demandes dans le front, on va avoir combien il va y avoir de pages
    useEffect(() => {
        if (setCount && demandes)
            setCount(Math.ceil(demandes.length / process.env.REACT_APP_NB_ITEMS_BY_PAGE));
    }, [setCount, demandes]);

    return (
        <div>
            {
                <div>
                    <h3>Voici une liste de parent qui a demandé de l'aide</h3>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Choix</TableCell>
                                <TableCell>Symptômes</TableCell>
                                <TableCell>Téléphone</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {demandes.map((demand) => (

                                <TableRow key={demand._id} className={classes.cursorpointer}>
                                    <TableCell>{demand.choix}</TableCell>
                                    <TableCell>{demand.symptomes}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'medium' }).format(new Date(demand.date))}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                    <Stack spacing={2}>
                        <Pagination page={page} onChange={(e, value) => setPage(value)} count={count} size="large" />
                    </Stack>
                </div>
            }
        </div >
    );
}
