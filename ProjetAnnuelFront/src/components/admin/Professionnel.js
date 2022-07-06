import React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import styles from '../../style/Payment.module.css';
import { makeStyles } from '@mui/styles'; // TODO replace
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';


const useStyles = makeStyles((theme) => ({
    fixedHeight: {
        height: 240,
    },
    tailleeye: {
        width: '25px',
        cursor: 'pointer',
    },
}));

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

export const Professionnel = ({ pro, setPros }) => {
    const classes = useStyles();
    // pour la modal 
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    // const [pros, setPros] = useState([]);

    const activate = async (id) => {
        const res = await axios({ url: `${process.env.REACT_APP_SERVER}/admin/pro/${id}/activate`, method: 'PUT', withCredentials: true }
        );
        const data = res.data;
        setPros((prev) => {
            const i = prev.findIndex(elem => {
                return elem._id === data._id;
            });
            prev.splice(i, 1, data);
            return [...prev];
        });
    };

    const deletePro = async (id) => {
        const res = await axios({ url: `${process.env.REACT_APP_SERVER}/admin/pro/${id}`, method: 'DELETE', withCredentials: true }
        );
        if (res.status === 204)
            setPros((prev) => [...prev.filter((item) => item._id !== id)]);
    };

    return (
        <TableRow key={pro._id} className={classes.cursorpointer}>
            <TableCell>
                {pro.lastname}
            </TableCell>
            <TableCell>
                {pro.firstname}
            </TableCell>
            <TableCell>
                {pro.email}
            </TableCell>
            <TableCell>
                {pro.phone}
            </TableCell>
            <TableCell>
                {
                    !pro.activatedByAdmin ? <Button onClick={() => activate(pro._id)} variant="contained" color="success">Activer </Button>
                        : <p className={styles.colorgreen} >✓</p>
                }
            </TableCell>
            <TableCell>
                {
                    pro.isDisponible === true ?
                        <p className={styles.colorgreen} >✓</p> :
                        <p>❌</p>
                }
            </TableCell>
            <TableCell>
                <Link onClick={handleOpen}>
                    <img src={require('../../images/eye.png')} alt="traitement" className={classes.tailleeye} />
                </Link>
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {pro.lastname}  {pro.firstname}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <b>Email :</b>  {pro.email} <br></br>
                            <b>Téléphone :</b>  {pro.phone} <br></br>
                            <b>Profession :</b> {pro.job}<br></br>
                            <b>Description :</b> {pro.description}<br></br>
                            <b>Adresse :</b> {pro.address} {pro.zipcode}<br></br>
                            <b>Description :</b> {pro.description} <br></br>
                            <b>Ville :</b> {pro.city}<br></br>
                        </Typography>
                    </Box>
                </Modal>
            </TableCell>
            <TableCell>
                <Link onClick={() => deletePro(pro._id)}>
                    <img src={require('../../images/poubelle-de-recyclage.png')} alt="traitement" className={classes.tailleeye} />
                </Link>
            </TableCell>
        </TableRow>

    );
}