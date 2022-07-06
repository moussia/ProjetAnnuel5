import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
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
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const ForgetPassword = () => {
    const [open, setOpen] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const navigate = useNavigate();
    const { context } = React.useContext(AuthContext);


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

        axios({ url: `${process.env.REACT_APP_SERVER}/user/forgetPassword`, method: 'POST', data })
            .then((data) => {
                e.target.reset();
                setOpenSuccess(true);
                reset();
            })
            .catch((err) => {
                console.log(err.message);
                // mettre ici la snackbar erreur
                setOpen(true);
                e.target.reset();
                reset();
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center">
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
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Email invalide
                    </Alert>
                </Snackbar>
                <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Email envoyé
                    </Alert>
                </Snackbar>
            </Container >
        </Grid>

    );
}