import React, { useCallback, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import styles from '../../style/Payment.module.css';

export const Historique = () => {
    const [demandes, setDemandes] = useState([]);
    const [page, setPage] = useState(1); //curent page sur laquel on est 
    const [count, setCount] = useState(1); // nombre de pages quil y a 
    const navigate = useNavigate();


    const fetchData = useCallback(() => {
        axios({ url: `${process.env.REACT_APP_SERVER}/user/historique`, method: 'GET', withCredentials: true })
            .then((data) => setDemandes(data.data))
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const finishreservation = (reservationId) => {
        axios({ url: `${process.env.REACT_APP_SERVER}/user/finishReservation/${reservationId}`, method: 'PUT', withCredentials: true })
            .then(() => fetchData());
    };

    //on calcul le count des demandes dans le front, on va avoir combien il va y avoir de pages
    useEffect(() => {
        if (setCount && demandes)
            setCount(Math.ceil(demandes.length / process.env.REACT_APP_NB_ITEMS_BY_PAGE));
    }, [setCount, demandes]);

    return (
        <div>
            {demandes.length === 0 ? (
                <h3>Vous n'avez aucune interventions</h3>) : (
                <div>
                    <h3 className={styles.textalign}>Voici l'historique de toutes vos demandes</h3>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Choix</TableCell>
                                <TableCell>Symptome</TableCell>
                                <TableCell>Terminé la demande</TableCell>
                                <TableCell>Don</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* on recup 10 par 10 */}
                            {demandes
                                .slice((page - 1) * process.env.REACT_APP_NB_ITEMS_BY_PAGE, (page * process.env.REACT_APP_NB_ITEMS_BY_PAGE))
                                .map((demand) => (
                                    <TableRow key={demand._id}>
                                        <TableCell>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'medium' }).format(new Date(demand.date))}</TableCell>
                                        <TableCell>

                                            {
                                                demand.status === "ANNULE" ?
                                                    <p className={styles.colorred}>Demande annulé</p> :
                                                    demand.status === "RESERVE" ?
                                                        <p className={styles.colororange}>Demande réservé</p> :
                                                        <p className={styles.colorgreen}>Demande fini</p>
                                            }

                                        </TableCell>
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
                                                            <p>Vous avez besoin d'aide</p>
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
                                                        color="warning"
                                                        variant="contained"
                                                        sx={{ mt: 3, mb: 2 }}
                                                        onClick={() => finishreservation(demand._id)}
                                                    >
                                                        Fermer la demande
                                                    </Button>
                                                    :
                                                    <p className={styles.textalign}>✓</p>
                                            }
                                        </TableCell>
                                        {/* faire une condition, si c'est terminé, on montre le button de don */}
                                        <TableCell>
                                            <Button
                                                type="submit"
                                                color="success"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => navigate(`/payment`)}
                                            >
                                                Faire un don
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    {/* pagination ici */}
                    <Stack spacing={2} >
                        <Pagination page={page} onChange={(e, value) => setPage(value)} count={count} size="large" />
                    </Stack>

                </div >)
            }
        </div >
    );
};