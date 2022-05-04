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
import '../style/forgetpassword.css';



export const ModifPassword = () => {

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
                            Modification du mot de passe
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="current_password"
                                label="Current password"
                                name="current_password"
                                autoFocus
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="new_password"
                                label="New password"
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
                                name="newpassword"
                                autoFocus
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Enregistrer
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}









