import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


export const StepperConfirmation = ({ choix, symptomes }) => {

    console.log("*********************", choix);
    return (
        <div>
            <p>Merci de nous faire confiance.</p>
            {choix === "tel" && <p>Gardez votre téléphone à proximité, un professionnel va vous appelez</p>}
            {choix === "chat" && <p>Veuillez attendre qu'un professionnel soit disponible</p>}
            {choix === "other" && <p>Veuillez attendre qu'un professionnel soit disponible</p>}


            {/* si cest un chat changer de page et afficher le chat */}
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
                <p>Veuillez patienter X minutes.</p>
            </Stack>

        </div>
    );

};