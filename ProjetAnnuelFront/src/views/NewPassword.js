import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextController } from '../components/form/textController';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const NewPassword = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
        }
    });


    const onSubmit = async (data, e) => {
        // e?.preventDefault();

        const token = new URLSearchParams(search).get('token');

        axios({ url: 'http://localhost:3003/user/resetPassword', method: 'POST', data: { ...data, token } })
            .then((data) => {
                console.log(data);
                navigate("/login");
                // setContext(() => ({ isLoggedIn: true, role: data.data.role }));
            })
            .catch((err) => {
                console.log(err.message);
                // mettre ici la snackbar erreur
                // e?.target?.reset();
                reset();
            });
    };

    return (
        <Container className="image-nature" maxWidth="xs">
            <CssBaseline />
            <Card className="centerbutton">
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
                                Nouveau mot de passe
                            </Typography>
                            <Box>
                                <TextController
                                    margin="normal"
                                    required
                                    fullWidth
                                    control={control}
                                    label="Nouveau mot de passe"
                                    name="new_password"
                                    autoFocus
                                />

                                <TextController
                                    margin="normal"
                                    required
                                    fullWidth
                                    control={control}
                                    label="Confirmation mot de passe"
                                    name="confirmation_password"
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
                                    autoFocus
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={!isValid || !isDirty || isSubmitting}
                                >
                                    Envoyer
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}









