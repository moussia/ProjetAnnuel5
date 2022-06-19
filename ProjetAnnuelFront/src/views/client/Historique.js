import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles'; // TODO replace
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import { MainListItems } from '../../views/admin/ListItems';

export const Historique = () => {
    const [demandes, setDemandes] = useState([]);


    useEffect(() => {
        axios({ url: `http://localhost:3003/user/historique`, method: 'GET', withCredentials: true })
            .then((data) => setDemandes(data.data))
    }, []);

    return (
        <div>


            <h3>Voici l'historique de toutes vos demandes</h3>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Choix</TableCell>
                        <TableCell>Symptomes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {demandes.map((demand) => (
                        <TableRow key={demand._id}>
                            <TableCell>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'medium' }).format(new Date(demand.date))}</TableCell>
                            <TableCell>{demand.status}</TableCell>
                            <TableCell>
                                {demand.choix === "tel" ?
                                    <p>Vous voulez discuter par téléphone</p>
                                    :
                                    <p>Vous voulez discuter par chat</p>
                                }
                            </TableCell>
                            <TableCell>
                                {demand.symptomes === "dormir" ?
                                    <p>Votre enfant n'arrive pas a dormir</p>
                                    :
                                    demand.symptomes === "malade" ?
                                        <p>Votre enfant est malade</p>
                                        :
                                        demand.symptomes === "pleure" ?
                                            <p>Votre enfant pleure beaucoup</p>
                                            :
                                            demand.symptomes === "soutien" ?
                                                <p>Vous avez besoin de soutien</p>
                                                :
                                                <p>Vous avez d'aide</p>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Stack spacing={2}>
                <Pagination count={10} size="large" />
            </Stack>


        </div >
    );
};