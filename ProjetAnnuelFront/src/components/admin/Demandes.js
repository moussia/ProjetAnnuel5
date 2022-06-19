import React, { useState } from 'react';
import { makeStyles } from '@mui/styles'; // TODO replace
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PhoneParent from '../../components/modal/phoneParent';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/contexts/AuthContext';
import { getSocket } from '../../utils/socket';

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
    const [pros, setPros] = useState([]);
    const [open, setOpen] = React.useState(null);
    const { context } = React.useContext(AuthContext);
    const handleClose = () => setOpen(null);
    const navigate = useNavigate();
    const socket = getSocket();

    useEffect(() => {
        if (context.isDisponible) {
            axios({ url: `http://localhost:3003/pro/getDemandes`, method: 'GET', withCredentials: true })
                .then((data) => setPros(data.data))
        }
    }, [context.isDisponible]);


    return (
        <div>
            {
                context.isDisponible === false ?
                    <h2>Vous êtes indiponible. Mettez vous disponible pour voir les demandes.</h2> :
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
                                {pros.map((demand) => (

                                    <TableRow key={demand._id} className={classes.cursorpointer}>
                                        <TableCell>{demand.choix}</TableCell>
                                        <TableCell>{demand.symptomes}</TableCell>
                                        <TableCell>Téléphone</TableCell>
                                        <TableCell>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'medium' }).format(new Date(demand.date))}</TableCell>
                                        <TableCell>
                                            {
                                                demand.status === "DEMANDE" ?
                                                    <Button type="submit" variant="contained" color="success" onClick={() => prendreDisponibilite(demand._id)} sx={{ mt: 3, mb: 2 }}>
                                                        Prendre disponibilité
                                                    </Button>
                                                    :
                                                    demand.status === "RESERVE" && demand.choix === "tel" ?
                                                        <Button type="submit" color="secondary" variant="contained" onClick={() => setOpen(demand._id)} sx={{ mt: 3, mb: 2 }}>
                                                            Afficher le numéro
                                                        </Button>
                                                        : demand.status === "RESERVE" && demand.choix === "chat" ?
                                                            <Button onClick={() => navigate(`/chat?id=${demand._id}`)} variant="contained" >
                                                                Ouvrir le chat
                                                            </Button>
                                                            : <p></p>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                        <PhoneParent open={open !== null} onClose={handleClose} idDemande={open} />
                        <Stack spacing={2}>
                            <Pagination count={10} size="large" />
                        </Stack>
                    </div>
            }
        </div >
    );
}
