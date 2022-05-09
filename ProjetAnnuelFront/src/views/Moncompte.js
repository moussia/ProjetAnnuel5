import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from '../style/moncompte.module.css';
import { useForm } from "react-hook-form";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { TextController } from '../components/form/textController';
import Link from '@mui/material/Link';
import { RadioController } from '../components/form/radioController';

export const Moncompte = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
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
        axios({ url: 'http://localhost:3003/user/current', method: 'GET', withCredentials: true })
            .then((data) => {
                console.log(data.data);
                reset(data.data);
            })
    }, [reset]);

    const onSubmit = async (data, e) => {
        e?.preventDefault();

        axios({ url: 'http://localhost:3003/user/update', method: 'PUT', withCredentials: true, data })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
                e?.target?.reset();
                reset();
            });
    };

    return (
        <Grid container className="centerbutton">
            <Card className="vertical-center">
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
                                        <FormControlLabel value="femme" label="Femme" control={<Radio />} />
                                        <FormControlLabel value="homme" label="Homme" control={<Radio />} />
                                    </RadioController>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextController
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        variant="standard"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Ce champ est obligatoire.'
                                            },
                                            minLength: {
                                                value: '5',
                                                message: 'L\'email doit contenir minimum 5 caractères.'
                                            }
                                        }}
                                        control={control}
                                        error={errors.email ? true : false}
                                        helperText={errors?.email?.message}
                                    />
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
                                        <Link href="/modifPassword" variant="body2">
                                            Modifier mot de passe
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} className="centerbutton">
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
        </Grid >
    );
}
