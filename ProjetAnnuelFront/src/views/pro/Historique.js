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
import DoneIcon from '@mui/icons-material/Done';

export const HistoriquePro = () => {
    const [demandes, setDemandes] = useState([]);
    const [page, setPage] = useState(1); //curent page sur laquel on est 
    const [count, setCount] = useState(1); // nombre de pages quil y a 

    useEffect(() => {
        axios({ url: `${process.env.REACT_APP_SERVER}/pro/historique`, method: 'GET', withCredentials: true })
            .then((data) => setDemandes(data.data))
    }, []);


    //on calcul le count des demandes dans le front, on va avoir combien il va y avoir de pages
    useEffect(() => {
        if (setCount && demandes)
            setCount(Math.ceil(demandes.length / process.env.REACT_APP_NB_ITEMS_BY_PAGE));
    }, [setCount, demandes]);

    return (
        <div>


            <h3>Voici l'historique de toutes vos interventions</h3>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Choix</TableCell>
                        <TableCell>Symptomes</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {demandes
                        .slice((page - 1) * process.env.REACT_APP_NB_ITEMS_BY_PAGE, (page * process.env.REACT_APP_NB_ITEMS_BY_PAGE))
                        .map((demand) => (
                            <TableRow key={demand._id}>
                                <TableCell>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'medium' }).format(new Date(demand.date))}</TableCell>
                                <TableCell>
                                    {demand.choix === "tel" ?
                                        <p>Le parent veut discuter par téléphone</p>
                                        :
                                        <p>Le parent veut discuter par chat</p>
                                    }
                                </TableCell>
                                <TableCell>
                                    {demand.symptomes === "dormir" ?
                                        <p>L'enfant n'arrive pas a dormir</p>
                                        :
                                        demand.symptomes === "malade" ?
                                            <p>L'enfant est malade</p>
                                            :
                                            demand.symptomes === "pleure" ?
                                                <p>L'enfant pleure beaucoup</p>
                                                :
                                                demand.symptomes === "soutien" ?
                                                    <p>Le parent a besoin de soutien</p>
                                                    :
                                                    <p>Le parent a d'aide</p>
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        demand.status === "FINI" ?
                                            <div>
                                                <DoneIcon />
                                            </div>
                                            :
                                            demand.status === "EN_COURS" ?
                                                <div>
                                                    <p>En cours</p>
                                                </div>
                                                :
                                                demand.status === "ANNULE" ?
                                                    <div>
                                                        <p>Annulé</p>
                                                    </div>
                                                    :
                                                    <p>Réservé</p>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <Stack spacing={2}>
                <Pagination page={page} onChange={(e, value) => setPage(value)} count={count} size="large" />
            </Stack>


        </div >
    );
};