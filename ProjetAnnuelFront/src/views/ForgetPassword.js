import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../components/contexts/AuthContext';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { TextController } from '../components/form/textController';
// import { useSnackbar } from 'notistack';

export const ForgetPassword = () => {
    const navigate = useNavigate();
    const { context } = React.useContext(AuthContext);

    // const { enqueueSnackbar } = useSnackbar();

    // const handleClickVariant = (variant) => () => {
    //     enqueueSnackbar('This is a success message!', { variant });
    // };


    React.useEffect(() => {
        if (context.isLoggedIn === true) {
            navigate("/");
        }
    }, [navigate, context]);


    const {
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        reset,
        control
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();

        axios({ url: 'http://localhost:3003/user/forgetPassword', method: 'POST', data })
            .then((data) => {
                e.target.reset();
                reset();
            })
            .catch((err) => {
                console.log(err.message);
                // mettre ici la snackbar erreur
                e.target.reset();
                reset();
            });
    };

    return (
        <Container className="image-nature" component="main" maxWidth="xs">
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
                                Mot de passe oublié
                            </Typography>
                            <Box>
                                <TextController
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    control={control}
                                    error={errors.email ? true : false}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Ce champ est obligatoire.'
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Adresse email invalide."
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
                                {/* <Button onClick={handleClickVariant('success')}>Show success snackbar</Button> */}
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/login" variant="body2">
                                            Connexion
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Inscription"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container >
    );
}