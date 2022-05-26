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



export const ForgetPassword = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    const navigate = useNavigate();
    const { context } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (context.isLoggedIn) {
            navigate("/");
        }
    }, [navigate, context.isLoggedIn]);

    return (
        <Container className="image-nature" component="main" maxWidth="xs">
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
                            Mot de passe oublié
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
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
                </CardContent>
            </Card>
        </Container>
    );
}