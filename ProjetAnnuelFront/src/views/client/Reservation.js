import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import styles from '../../style/reservation.module.css';
import { Button } from '@material-ui/core';


export const Reservation = () => {
    return (

        <Grid container spacing={3} className={styles.margintoptrois}>
            <Grid item xs={5}>

            </Grid>
            <Grid item xs={7}>
                <h2>Bonjour  </h2>
                <p>Choisissez l'heure et la date à laquelle vous voulez qu'un professionnel vienne dans votre domicile.</p>
                <Stack component="form" noValidate spacing={3}>
                    <TextField
                        id="jour"
                        label="Jour"
                        type="date"
                        defaultValue="2022-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="heure"
                        label="Heure"
                        type="time"
                        defaultValue="19:30"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        sx={{ width: 150 }}
                    />

                </Stack>
                <Button variant="contained" color="success">
                    Success
                </Button>
            </Grid>
        </Grid>

    );
}