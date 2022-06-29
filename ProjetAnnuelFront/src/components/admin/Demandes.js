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
import styles from '../../style/Payment.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { getSocket } from '../../utils/socket';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MuiAppBar from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from '../../components/admin/drawer/ListItems';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';

// modal pour le pro
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const useStyles = makeStyles((theme) => ({
    fixedHeight: {
        height: 240,
    },
    tailleeye: {
        width: '25px',
        cursor: 'pointer',
    },
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();


export const Demandes = () => {
    const classes = useStyles();
    const [demandes, setDemandes] = useState([]);
    const [page, setPage] = useState(1); //curent page sur laquel on est 
    const [count, setCount] = useState(1); // nombre de pages quil y a 
    const [openmodal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [pros, setPros] = useState([]);
    const socket = getSocket();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        axios({ url: `http://localhost:3003/admin/getAllDemandes`, method: 'GET', withCredentials: true })
            .then((data) => {
                setDemandes(data.data);
            })
            .catch((e) => {
                console.log(e)
            });
    }, []);

    //on calcul le count des demandes dans le front, on va avoir combien il va y avoir de pages
    useEffect(() => {
        if (setCount && demandes)
            setCount(Math.ceil(demandes.length / process.env.REACT_APP_NB_ITEMS_BY_PAGE));
    }, [setCount, demandes]);


    const prendreDisponibilite = async (id) => {
        const res = await axios({ url: `http://localhost:3003/pro/${id}/activate`, method: 'PUT', withCredentials: true });
        const data = res.data;
        setPros((prev) => {
            const i = prev.findIndex(elem => elem._id === data._id);
            prev.splice(i, 1, data);
            return [...prev];
        });
        socket.emit("join_room", id);
        socket.emit("match", id);
    };


    return (
        <div>
            <ThemeProvider theme={mdTheme}>
                {
                    <div>
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />

                            <Drawer variant="permanent" open={open}>
                                <Toolbar
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        px: [1],
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer}>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                </Toolbar>
                                <Divider />
                                <List component="nav">
                                    <MainListItems />
                                </List>
                            </Drawer>
                            <Box
                                component="main"
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
                                                <h3>Voici une liste de parent qui a demandé de l'aide</h3>

                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Parent</TableCell>
                                                            <TableCell>Date</TableCell>
                                                            <TableCell>Choix</TableCell>
                                                            <TableCell>Symptômes</TableCell>
                                                            <TableCell>Téléphone</TableCell>
                                                            <TableCell>Email</TableCell>
                                                            <TableCell>Status</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {demandes
                                                            .slice((page - 1) * process.env.REACT_APP_NB_ITEMS_BY_PAGE, (page * process.env.REACT_APP_NB_ITEMS_BY_PAGE))
                                                            .map((demand) => (

                                                                <TableRow key={demand._id} className={classes.cursorpointer}>
                                                                    <TableCell>
                                                                        {demand.id_parent.lastname}  {demand.id_parent.firstname}
                                                                    </TableCell>
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
                                                                    <TableCell> {demand.id_parent.phone}</TableCell>
                                                                    <TableCell>{demand.id_parent.email}</TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            demand.status === "FINI" ?
                                                                                <div className={styles.textalign}>
                                                                                    <img src={require('../../images/eye.png')} onClick={handleOpen} alt="traitement" className={classes.tailleeye} />
                                                                                    <Modal
                                                                                        aria-labelledby="transition-modal-title"
                                                                                        aria-describedby="transition-modal-description"
                                                                                        open={openmodal}
                                                                                        onClose={handleClose}
                                                                                        closeAfterTransition
                                                                                        BackdropComponent={Backdrop}
                                                                                        BackdropProps={{
                                                                                            timeout: 500,
                                                                                        }}
                                                                                    >
                                                                                        <Fade in={openmodal}>
                                                                                            <Box sx={style}>
                                                                                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                                                                                    Information concernant le <b>professionnel</b> ayant reservé cette demande
                                                                                                </Typography>
                                                                                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                                                                                    <p> Nom - prénom : {demand.id_pro.lastname} {demand.id_pro.firstname} </p>
                                                                                                    <p> Email : {demand.id_pro.email} </p>
                                                                                                    <p> Téléphone : {demand.id_pro.phone} </p>
                                                                                                    <p> Sexe : {
                                                                                                        demand.id_pro.sex === "MAN" ?
                                                                                                            <span>  Homme </span> :
                                                                                                            <span>   Femme </span>
                                                                                                    }  </p>
                                                                                                    <p>Adresse : {demand.id_pro.address} {demand.id_pro.zipcode}  {demand.id_pro.city}  </p>
                                                                                                </Typography>
                                                                                            </Box>
                                                                                        </Fade>
                                                                                    </Modal>
                                                                                </div>
                                                                                :
                                                                                demand.status === "EN_COURS" ?
                                                                                    <p className={styles.colorgreen}>En cours</p>
                                                                                    :
                                                                                    demand.status === "ANNULE" ?
                                                                                        <p className={styles.colorred}>Annulé</p>
                                                                                        :
                                                                                        demand.status === "DEMANDE" ?
                                                                                            <Button type="submit" variant="contained" color="success" onClick={() => prendreDisponibilite(demand._id)} sx={{ mt: 3, mb: 2 }}>
                                                                                                Prendre disponibilité
                                                                                            </Button>
                                                                                            :
                                                                                            <p className={styles.colororange}>Réservé</p>
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                                <Stack spacing={2}>
                                                    <Pagination page={page} onChange={(e, value) => setPage(value)} count={count} size="large" />
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Box>
                        </Box>
                    </div>
                }
            </ThemeProvider>
        </div>
    );
}
