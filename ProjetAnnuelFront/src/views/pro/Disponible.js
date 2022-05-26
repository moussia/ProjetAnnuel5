import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import styles from '../../style/reservation.module.css';
import { Button } from '@material-ui/core';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const Disponible = () => {
    const [datedebut, setDateDebut] = React.useState(new Date('2022-01-01T00:12:00.000Z'));
    const [datefin, setDateFin] = React.useState(new Date('2022-01-01T00:12:00.000Z'));

    return (

        <Grid container spacing={3} className={styles.margintoptrois}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
                <h2>Chère Professionnel,  </h2>
                <p>Choisissez l'heure et la date à laquelle vous êtes disponible et vous souhaitez aidez des parents.</p>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DateTimePicker
                            label="Date de début"
                            renderInput={(params) => <TextField {...params} />}
                            value={datedebut}
                            onChange={(newValue) => {
                                setDateDebut(newValue);
                            }}
                        />
                        <DateTimePicker
                            label="Date de fin"
                            renderInput={(params) => <TextField {...params} />}
                            value={datefin}
                            onChange={(newValue) => {
                                setDateFin(newValue);
                            }}
                        />
                    </Stack>
                </LocalizationProvider>

                <Button variant="contained" color="success">
                    Success
                </Button>
            </Grid>
        </Grid >

    );
}
