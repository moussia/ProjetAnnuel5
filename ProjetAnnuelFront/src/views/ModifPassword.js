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
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Snackbar from '@mui/material/Snackbar';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const ModifPassword = () => {
    const [open, setOpen] = React.useState(false);


    const {
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        reset,
        control
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            password: '',
        }
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();

        axios({ url: 'http://localhost:3003/user/modifPassword', method: 'POST', data, withCredentials: true })
            .then((data) => {
                e.target.reset();
                setOpen(true);
                reset();
            })
            .catch((err) => {
                e.target.reset();
                reset();
            });
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }


    return (
        <Container className="image-nature" maxWidth="xs">
            <CssBaseline />
            <Card className="centerbutton">
                <CardContent>
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
                            Modification du mot de passe
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
                            <TextController
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                label="Nouveau mot de passe"
                                name="password"
                                autoFocus
                                control={control}
                                error={errors.password ? true : false}
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
                                        // eslint-disable-next-line
                                        value: '(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$',
                                        message: 'Le mot de passe doit contenir une majuscule, une minuscule, un caractère spécial ou un chiffre.'
                                    }
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!isValid || !isDirty || isSubmitting}
                            >
                                Enregistrer
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Nouveau mot de passe enregistré
                </Alert>
            </Snackbar>
        </Container>
    );
}









