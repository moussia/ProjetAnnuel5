import React from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { TextController } from '../components/form/textController';
import { useForm } from "react-hook-form";
import axios from 'axios';
import styles from '../style/login.module.css';


export const Login = () => {
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
        }
    });

    const onSubmit = async (data, e) => {
        e?.preventDefault();

        axios({ url: 'http://localhost:3003/session', method: 'POST', withCredentials: true, data })
            .then((data) => {
                console.log(data);

                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
                e?.target?.reset();
                reset();
            });
    };

    return (
        <Grid container className={styles.imagenature}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Card className={styles.centerbutton}>
                    <CardContent>
                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Connexion
                                </Typography>
                                <TextController
                                    fullWidth
                                    label='Email'
                                    // className='loginInput'
                                    variant='outlined'
                                    name='email'
                                    required
                                    margin="normal"
                                    autoComplete="email"
                                    autoFocus
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Saisie incorrecte.'
                                        }//une lettre , majuscule, mail non valide
                                    }}
                                    control={control}
                                    error={errors.email ? true : false}
                                    helperText={errors?.email?.message}
                                />
                                <TextController
                                    fullWidth
                                    label='Mot de passe'
                                    // className='loginInput'
                                    variant='outlined'
                                    type='password'
                                    name='password'
                                    required
                                    margin="normal"
                                    autoComplete="email"
                                    autoFocus
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Saisie incorrecte.'
                                        }
                                    }}
                                    control={control}
                                    error={errors.password ? true : false}
                                    helperText={errors?.password?.message}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={!isValid || !isDirty || isSubmitting}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/forgetpassword" variant="body2">
                                            Mot de passe oublié
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Inscription"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Grid>
    );
}