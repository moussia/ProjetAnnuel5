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

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
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

    useEffect(() => {
        if (context.isDisponible) {
            axios({ url: `http://localhost:3003/pro/getDemandes`, method: 'GET', withCredentials: true })
                .then((data) => setPros(data.data))
        }
    }, [context.isDisponible]);

    const prendreDisponibilite = async (id) => {
        const res = await axios({ url: `http://localhost:3003/pro/${id}/activate`, method: 'PUT', withCredentials: true });
        const data = res.data;
        setPros((prev) => {
            const i = prev.findIndex(elem => elem._id === data._id);
            prev.splice(i, 1, data);
            return [...prev];
        });
        console.log('prendreDisponibilite');
        socket.emit("join_room", id);
        socket.emit("match", id);
    };


    return (
        <div className={classes.root}>

            <main className={classes.content}>
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
                                            {/* <TableCell>
                                        <Button type="submit" variant="contained" onClick={() => setOpen(demand._id)} sx={{ mt: 3, mb: 2 }}>
                                            En savoir plus
                                        </Button>
                                    </TableCell> */}


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



            </main >
        </div >
    );
}
