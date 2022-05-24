import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import styles from '../../style/reservation.module.css';


export const Reservation = () => {
    return (

        <Grid container spacing={3} className={styles.margintoptrois}>
            <Grid item xs={2}>
                <p>xs=6</p>
            </Grid>
            <Grid item xs={10}>

                <p>Choisissez l'heure et la date à laquelle vous voulez q'un professionnel vienne dans votre domicile.</p>

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
            </Grid>
        </Grid>

    );
}