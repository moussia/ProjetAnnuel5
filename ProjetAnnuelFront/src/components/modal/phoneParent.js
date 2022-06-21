import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import axios from 'axios';

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

export default function PhoneParent({ open, onClose, idDemande }) {
    const [phone, setPhone] = React.useState(null);

    useEffect(() => {
        if (idDemande) {
            axios({ url: `http://localhost:3003/pro/getDemande/${idDemande}`, method: 'GET', withCredentials: true })
                .then((res) => {
                    setPhone(res.data.phone);
                    console.log("data-> ", res.data.phone);
                })
        }
    }, [idDemande]);

    return (
        <div>
            <Modal open={open} onClose={onClose}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Appeler le parent
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Voici le numéro de téléphone à contacter : {phone}. <br></br>
                        Si vous voulez appeler en numéro masqué, n'oubliez pas de mettre "#31#" avant le numéro.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
