import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';


export const Services = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <button>Demander la visite d'un médecin</button>
                <br></br>
                <Link href="#">Demander la visite d'un médecin</Link>
            </Grid>
            <Grid item xs={3}>
                <Link href="#">Demander un RDV en consultation</Link>
            </Grid>
            <Grid item xs={3}>
                <Link href="#">Appelez-nous pour des conseils</Link>
            </Grid>
            <Grid item xs={3}>
                <Link href="#">Appelez-nous en urgence</Link>
            </Grid>
        </Grid>
    );
}
