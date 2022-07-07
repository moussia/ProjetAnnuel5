import Button from '@mui/material/Button';
import { Alert, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from '../style/moncompte.module.css';
import { useForm } from "react-hook-form";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import { TextController } from '../components/form/textController';
import { RadioController } from '../components/form/radioController';
import { Link } from 'react-router-dom';
import request from '../utils/request.js';

export const Moncompte = () => {
    const [open, setOpen] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstname: '',
            lastname: '',
            zipcode: '',
            address: '',
            city: '',
            phone: '',
            sex: ''
        }
    });

    useEffect(() => {
        request.get(`/user/current`)
            .then((data) => {
                console.log(data.data);
                reset(data.data);
            })
    }, [reset]);

    const onSubmit = async (data, e) => {
        // e?.preventDefault();
        await request.put(`/user/update`, data)
            .then((data) => {
                setOpenSuccess(true);
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
                // mettre ici la snackbar erreur
                setOpen(true);
                // e?.target?.reset();
                reset();
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
        <Grid container className={styles.centerbutton}>
            <Card className={styles.verticalcenter}>
                <CardContent>
                    <div>
                        <h1>Informations personnelles</h1>
                        <p>Infos sur vous et vos préférences dans nos services</p>
                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextController
                                        required
                                        fullWidth
                                        id="standard-required"
                                        label="Nom"
                                        name="lastname"
                                        variant="standard"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Ce champ est obligatoire.'
                                            },
                                            minLength: {
                                                value: '2',
                                                message: 'Veuillez saisir minimum 2 caractères.'
                                            }
                                        }}
                                        control={control}
                                        error={errors.lastname ? true : false}
                                        helperText={errors?.lastname?.message}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextController
                                        required
                                        fullWidth
                                        id="standard-required"
                                        label="Prénom"
                                        name="firstname"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Ce champ est obligatoire.'
                                            },
                                            minLength: {
                                                value: '2',
                                                message: 'Veuillez saisir minimum 2 caractères.'
                                            }
                                        }}
                                        variant="standard"
                                        control={control}
                                        error={errors.firstname ? true : false}
                                        helperText={errors?.firstname?.message}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextController
                                        required
                                        fullWidth
                                        id="standard-required"
                                        label="Adresse"
                                        name="address"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Ce champ est obligatoire.'
                                            },
                                            minLength: {
                                                value: '10',
                                                message: 'Veuillez saisir minimum 10 caractères.'
                                            }
                                        }}
                                        variant="standard"
                                        control={control}
                                        error={errors.address ? true : false}
                                        helperText={errors?.address?.message}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextController
                                        required
                                        fullWidth
                                        label="Code Postal"
                                        name="zipcode"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Ce champ est obligatoire.'
                                            },
                                            min: {
                                                value: '2',
                                                message: 'Veuillez saisir minimum 2 caractères.'
                                            },
                                            minLength: {
                                                value: '2',
                                                message: 'Le code postal doit contenir minimum 2 caractères.'
                                            }
                                        }}
                                        variant="standard"
                                        control={control}
                                        error={errors.zipcode ? true : false}
                                        helperText={errors?.zipcode?.message}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextController
                                        required
                                        fullWidth
                                        id="standard-required"
                                        label="Ville"
                                        name="city"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Ce champ est obligatoire.'
                                            },
                                            minLength: {
                                                value: '2',
                                                message: 'Veuillez saisir minimum 2 caractères.'
                                            }
                                        }}
                                        variant="standard"
                                        control={control}
                                        error={errors.city ? true : false}
                                        helperText={errors?.city?.message}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <RadioController
                                        name="sex"
                                        control={control}
                                    >
                                        <FormControlLabel value="WOMAN" label="Femme" control={<Radio />} />
                                        <FormControlLabel value="MAN" label="Homme" control={<Radio />} />
                                    </RadioController>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextController
                                        fullWidth
                                        required
                                        label="Telephone"
                                        name="phone"
                                        type="tel"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Ce champ est obligatoire.'
                                            },
                                            min: {
                                                value: '10',
                                                message: 'Veuillez saisir minimum 10 caractères.'
                                            },
                                            minLength: {
                                                value: '10',
                                                message: 'Veuillez saisir minimum 10 caractères.'
                                            }
                                        }}
                                        variant="standard"
                                        control={control}
                                        error={errors.phone ? true : false}
                                        helperText={errors?.phone?.message}
                                    />
                                </Grid>

                                <Grid container>
                                    <Grid item xs>
                                        <Link to="/modifPassword" variant="body2">
                                            Modifier mot de passe
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} className={styles.centerbutton}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="success"
                                    >
                                        Modifier
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </CardContent>
            </Card>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Enregistrement impossible
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Enregistré
                </Alert>
            </Snackbar>
        </Grid >
    );
}
