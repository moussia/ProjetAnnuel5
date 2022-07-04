import React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const StepperConfirmation = ({ choix, symptomes, waitingTime, match }) => {
    const navigate = useNavigate();

    return (
        <div>
            <p>Merci de nous faire confiance.</p>
            {choix === "tel" && <p>Gardez votre téléphone à proximité, un professionnel va vous appelez</p>}
            {choix === "chat" && <p>Veuillez attendre qu'un professionnel soit disponible</p>}

            {/* si cest un chat changer de page et afficher le chat */}
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                {match ?
                    choix === "chat" ?
                        (navigate(`/chat?id=${match}`))
                        : (<Button variant="contained" color="success">Veuillez patienter, un professionnel est en train de vous contacter.</Button>)
                    : (
                        <>
                            <CircularProgress color="secondary" />
                            {waitingTime < 30 ?
                                (<p>Veuillez patienter {waitingTime} minutes.</p>)
                                : (<p>Veuillez patienter, le temps d'attente est superieur à 30 minutes.</p>
                                )
                            }
                        </>
                    )}
            </Stack>
        </div>
    );

};