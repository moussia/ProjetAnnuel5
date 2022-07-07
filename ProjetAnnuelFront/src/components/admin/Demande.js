import React from 'react';
import { makeStyles } from '@mui/styles'; // TODO replace
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import request from '../../utils/request';

import styles from '../../style/Payment.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

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


export const Demande = ({ demand, setDemandes }) => {
    const classes = useStyles();
    const [openmodal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);


    useEffect(() => {
        request.get(`/admin/getAllDemandes`)
            .then((data) => {
                setDemandes(data.data);
            })
            .catch((e) => {
                console.log(e)
            });
    }, []);

    return (
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
                                    <p className={styles.colororange}>Demandé</p>
                                    :
                                    <p className={styles.colororange}>Réservé</p>
                }
            </TableCell>
        </TableRow>
    );
}
