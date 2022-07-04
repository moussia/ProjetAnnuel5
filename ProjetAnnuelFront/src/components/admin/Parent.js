import React from 'react';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles'; // TODO replace
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
    tailleeye: {
        width: '25px',
        cursor: 'pointer',
    },
    fixedHeight: {
        height: 240,
    },
}));

export const Parent = ({ parent, setParent }) => {
    const classes = useStyles();
    //modal
    const [openModalParent, setOpenModalParent] = React.useState(false);
    const handleOpen = () => setOpenModalParent(true);
    const handleClose = () => setOpenModalParent(false);
    //

    const deleteParent = async (id) => {
        const res = await axios({ url: `${process.env.REACT_APP_SERVER}/admin/parent/${id}`, method: 'DELETE', withCredentials: true }
        );
        if (res.status === 204)
            setParent((prev) => [...prev.filter((item) => item._id !== id)]);
    };

    return (
        <TableRow key={parent._id}>
            <TableCell>
                {parent.lastname}
            </TableCell>
            <TableCell>{parent.firstname}</TableCell>
            <TableCell>{parent.email}</TableCell>
            <TableCell>{parent.phone}</TableCell>
            <TableCell>
                <Link onClick={handleOpen}>
                    <img src={require('../../images/eye.png')} alt="traitement" className={classes.tailleeye} />
                </Link>
            </TableCell>
            <Modal
                open={openModalParent}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {parent.firstname} {parent.lastname}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Adresse :  {parent.address} <br></br>
                        Ville :  {parent.city} {parent.zipcode} <br></br>
                        Email :  {parent.email} <br></br>
                        Téléphone :  {parent.phone} <br></br>
                    </Typography>
                </Box>
            </Modal>
            <TableCell>
                <Link onClick={() => deleteParent(parent._id)}>
                    <img src={require('../../images/poubelle-de-recyclage.png')} alt="traitement" className={classes.tailleeye} />
                </Link>
            </TableCell>
        </TableRow>
    );
}