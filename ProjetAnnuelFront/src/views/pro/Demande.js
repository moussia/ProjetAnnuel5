import React, { useCallback, useState } from 'react';
import { makeStyles } from '@mui/styles'; // TODO replace
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PhoneParent from '../../components/modal/phoneParent';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/contexts/AuthContext';
import { getSocket } from '../../utils/socket';
import styles from '../../style/Payment.module.css';
import request from '../../utils/request';


const useStyles = makeStyles((theme) => ({
    fixedHeight: {
        height: 240,
    },
    tailleeye: {
        width: '25px',
        cursor: 'pointer',
    },
}));


export const Demande = () => {
    const classes = useStyles();
    const [pros, setPros] = useState([]);
    const [open, setOpen] = React.useState(null);
    const { context } = React.useContext(AuthContext);
    const handleClose = () => setOpen(null);
    const navigate = useNavigate();
    const socket = getSocket();
    const [page, setPage] = useState(1); //curent page sur laquel on est 
    const [count, setCount] = useState(1); // nombre de pages quil y a 

    const fetchData = useCallback(() => {
        if (context.isDisponible) {
            request.get(`/pro/getDemandes`)
                .then((data) => setPros(data.data))
        };
    }, [context.isDisponible]);

    useEffect(() => {
        if (fetchData && context.isDisponible) fetchData();
    }, [fetchData, context.isDisponible]);

    const prendreDisponibilite = async (id) => {
        const res = await request.put(`/pro/${id}/activate`);
        const data = res.data;
        setPros((prev) => {
            const i = prev.findIndex(elem => elem._id === data._id);
            prev.splice(i, 1, data);
            return [...prev];
        });
        socket.emit("join_room", id);
        socket.emit("match", id);
    };

    //on calcul le count des demandes dans le front, on va avoir combien il va y avoir de pages
    useEffect(() => {
        if (setCount && pros)
            setCount(Math.ceil(pros.length / process.env.REACT_APP_NB_ITEMS_BY_PAGE));
    }, [setCount, pros]);

    const finishreservation = (reservationId) => {
        request.put(`/user/finishReservation/${reservationId}`)
            .then(() => fetchData());
    };

    return (
        <div>
            {
                context.isDisponible === false ?
                    <h2 className={styles.textalign}>Vous êtes indiponible. Mettez vous disponible pour voir les demandes.</h2> :
                    <div>
                        <h3>Voici une liste de parent qui a demandé de l'aide</h3>

                        <Table size="small">
                            <TableHead>
                                <TableRow className={styles.bagroundcolorgray}>
                                    <TableCell>Choix</TableCell>
                                    <TableCell>Symptômes</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Contactez le parent</TableCell>
                                    <TableCell>Fermé la demande</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pros.map((demand) => (

                                    <TableRow key={demand._id} className={classes.cursorpointer}>
                                        <TableCell>
                                            {
                                                demand.choix === "tel" ?
                                                    <p>Le parent veut être contacter par téléphone</p> :
                                                    <p>Le parent veut être contacter par chat</p>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                demand.symptomes === "soutien" ?
                                                    <p>Le parent à besoin de soutien</p> :
                                                    demand.symptomes === "malade" ?
                                                        <p>L'enfant est malade</p> :
                                                        demand.symptomes === "pleure" ?
                                                            <p>L'enfant pleure beaucoup</p> :
                                                            demand.symptomes === "dormir" ?
                                                                <p>L'enfant n'arrive pas à dormir</p> :
                                                                <p>Le parent a besoin d'aide</p>
                                            }
                                        </TableCell>
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
                                        <TableCell>
                                            {demand.status === "EN_COURS" ?
                                                <Button
                                                    type="submit"
                                                    color="success"
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2 }}
                                                >
                                                    Fermé la demande
                                                </Button>
                                                :
                                                demand.status === "RESERVE" ?
                                                    <Button
                                                        type="submit"
                                                        color="error"
                                                        variant="contained"
                                                        sx={{ mt: 3, mb: 2 }}
                                                        onClick={() => finishreservation(demand._id)}
                                                    >
                                                        Fermer la demande
                                                    </Button>
                                                    :
                                                    <p></p>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                        <PhoneParent open={open !== null} onClose={handleClose} idDemande={open} />
                        <Stack spacing={2}>
                            <Pagination page={page} onChange={(e, value) => setPage(value)} count={count} size="large" />
                        </Stack>


                    </div>
            }

        </div>
    );
}
