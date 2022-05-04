import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { TextController } from '../components/form/textController';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import '../style/signup.css'
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RadioController } from '../components/form/radioController';

export default function Signup() {
    const navigate = useNavigate();

    const {
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        reset,
        control
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            zipcode: '',
            city: '',
            country: '',
            address: '',
            birthday: '',
            phone: '',
            sex: 'WOMAN'
        }
    });

    const onSubmit = async (data, e) => {
        e?.preventDefault();

        axios({ url: 'http://localhost:3003/user/create', method: 'POST', data })
            .then((data) => {
                navigate("/");
            })
            .catch((err) => {
                e?.target?.reset();
                reset();
            });
    };

    return (
        <>
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Container className="image-nature">
                        <Card className="centerbutton">
                            <CardContent>
                                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                                    <Avatar className="" sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Inscription
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <TextController
                                                required
                                                fullWidth
                                                label='Prénom'
                                                className='signupInput'
                                                name='firstname'
                                                margin="normal"
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
                                                error={errors.firstname ? true : false}
                                                helperText={errors?.firstname?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextController
                                                required
                                                fullWidth
                                                label='Nom'
                                                className='signupInput'
                                                name='lastname'
                                                margin="normal"
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: 'Ce champ est obligatoire'
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
                                                fullWidth
                                                label='Telephone'
                                                className='signupInput'
                                                variant='outlined'
                                                name='phone'
                                                required
                                                margin="normal"
                                                autoFocus
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
                                                control={control}
                                                error={errors.phone ? true : false}
                                                helperText={errors?.phone?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextController
                                                fullWidth
                                                label='Adresse'
                                                className='signupInput'
                                                variant='outlined'
                                                name='address'
                                                required
                                                margin="normal"
                                                autoFocus
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
                                                control={control}
                                                error={errors.address ? true : false}
                                                helperText={errors?.address?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextController
                                                fullWidth
                                                label='Ville'
                                                className='signupInput'
                                                variant='outlined'
                                                name='city'
                                                required
                                                margin="normal"
                                                autoComplete="ville"
                                                autoFocus
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
                                                error={errors.city ? true : false}
                                                helperText={errors?.city?.message}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextController
                                                fullWidth
                                                label='Code postal'
                                                className='signupInput'
                                                variant='outlined'
                                                name='zipcode'
                                                required
                                                margin="normal"
                                                autoFocus
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
                                                control={control}
                                                error={errors.zipcode ? true : false}
                                                helperText={errors?.zipcode?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextController
                                                fullWidth
                                                unique="true"
                                                label='Email'
                                                className='signupInput'
                                                variant='outlined'
                                                name='email'
                                                required
                                                margin="normal"
                                                autoComplete="email"
                                                autoFocus
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
                                                label='Mot de passe'
                                                className='signupInput'
                                                variant='outlined'
                                                type='password'
                                                name='password'
                                                required
                                                margin="normal"
                                                autoComplete=""
                                                autoFocus
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: 'Ce champ est obligatoire.'
                                                    },
                                                    minLength: {
                                                        value: '8',
                                                        message: 'Le mot de passe doit contenir minimum 8 caractères.'
                                                    },
                                                    pattern: {
                                                        value: '(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$',
                                                        message: 'Le mot de passe doit contenir une majuscule, une minuscule, un caractère spécial ou un chiffre.'
                                                    }
                                                }}
                                                control={control}
                                                error={errors.password ? true : false}
                                                helperText={errors?.password?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <RadioController name="sex" control={control}>
                                                <FormControlLabel value="WOMAN" label="Femme" control={<Radio />} labelPlacement="femme" />
                                                <FormControlLabel value="MAN" label="Homme" control={<Radio />} labelPlacement="homme" />
                                            </RadioController>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                disabled={!isValid || !isDirty || isSubmitting}
                                            >
                                                ENVOYER
                                            </Button>
                                            <Grid item>
                                                <Link href="/forgetpassword" variant="body2">
                                                    Mot de passe oublié
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link href="/login" variant="body2">
                                                    {"Connexion"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Container >
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </>
    );
}