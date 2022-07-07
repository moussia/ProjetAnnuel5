import React from 'react';
import { useContext } from 'react';
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
import styles from '../style/login.module.css';
import { AuthContext } from '../components/contexts/AuthContext';
import { roles } from '../constants/roles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { PasswordController } from '../components/form/passwordController';
import request from '../utils/request';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login = () => {
    const [open, setOpen] = React.useState(false);
    const [openWarning, setOpenWarning] = React.useState(false);
    const { context, setContext } = useContext(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (context.isLoggedIn === true) {
            if (context.role === roles.ADMIN) {
                navigate("/dashboard");
            }
            else {
                navigate("/");
            }
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
            password: '',
        }
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();

        request.post(`/session`, data)
            .then((data) => {
                setContext(() => ({ isLoggedIn: true, role: data.data.role }));
            })
            .catch((err) => {
                if (err.message === "Activation by admin required")
                    setOpenWarning(true);
                if (err.message === "Activation require")
                    setOpen(true);
                else
                    setOpen(true);
                console.log(err.message);
                e.target.reset();
                reset();
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    const handleCloseWarning = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenWarning(false);
    }

    return (
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center" className={styles.colorpurple}>
            <Container maxWidth="xs" className={styles.marginhaut}>
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
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }

                                    }}
                                    control={control}
                                    error={errors.email ? true : false}
                                    helperText={errors?.email?.message}
                                />
                                <PasswordController
                                    fullWidth
                                    label='Mot de passe'
                                    variant='outlined'
                                    name='password'
                                    required
                                    autoComplete="password"
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
                                    Connexion
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
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Email ou mot de passe invalide
                </Alert>
            </Snackbar>
            <Snackbar open={openWarning} autoHideDuration={3000} onClose={handleCloseWarning} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseWarning} severity="warning" sx={{ width: '100%' }}>
                    En attente de l'activation de ton compte par l'admin.
                </Alert>
            </Snackbar>
        </Grid>
    );
}