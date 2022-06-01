import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RadioController } from '../../components/form/radioController';
import styles from '../../style/signup.module.css';
import { TextController } from '../../components/form/textController';
import { MenuItem } from '@mui/material';
import { SelectController } from '../../components/form/selectController';
import { AuthContext } from '../../components/contexts/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { PasswordController } from '../../components/form/passwordController';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignupPro() {
    const [open, setOpen] = React.useState(false);
    const [openErreur, setOpenErreur] = React.useState(false);
    const { context } = React.useContext(AuthContext);
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
            job: '',
            role: 'PRO',
            sex: 'WOMAN'
        }
    });


    React.useEffect(() => {
        if (context.isLoggedIn === true) {
            navigate("/");
        }
    }, [navigate, context.isLoggedIn]);

    const onSubmit = async (data, e) => {
        e.preventDefault();

        axios({ url: 'http://localhost:3003/user/pro/create', method: 'POST', data, withCredentials: true })
            .then((data) => {
                setOpen(true);
            })
            .catch((err) => {
                setOpenErreur(true);
            });
        e.target.reset();
        reset();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    const handleCloseErreur = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenErreur(false);
    }

    return (
        // <>
        <Grid container className={styles.colorpurple}>
            <Grid item xs={3} />
            <Grid item xs={6}>
                <Container>
                    <Card className={styles.centerbutton}>
                        <CardContent>
                            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                                <Avatar className={styles.centercadenas} sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5" className={styles.textalign}>
                                    Inscription Professionnel
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextController
                                            required
                                            fullWidth
                                            label='Prénom'
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
                                                },
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Adresse email invalide."
                                                }
                                            }}
                                            control={control}
                                            error={errors.email ? true : false}
                                            helperText={errors?.email?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <PasswordController
                                            fullWidth
                                            label='Mot de passe'
                                            variant='outlined'
                                            name='password'
                                            required
                                            margin="normal"
                                            autoComplete="password"
                                            autoFocus
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: 'Saisie incorrecte.'
                                                },
                                                minLength: {
                                                    value: '8',
                                                    message: 'Le mot de passe doit contenir minimum 8 caractères.'
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\/+=%"])[A-Za-z\d@$!%*?&\/+=%"]{8,}$/,
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
                                            <FormControlLabel value="WOMAN" label="Femme" control={<Radio />} />
                                            <FormControlLabel value="MAN" label="Homme" control={<Radio />} />
                                            {/* <FormControlLabel value="MAN" label="Homme" control={<Radio />} labelPlacement="homme" /> */}
                                        </RadioController>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SelectController name="job" control={control}>
                                            <MenuItem value="parents">Parents</MenuItem>
                                            <MenuItem value="pediatre">Pédiatre</MenuItem>
                                            <MenuItem value="educatrice">Educatrice</MenuItem>
                                            <MenuItem value="auxiliaire">Auxiliaire</MenuItem>
                                            <MenuItem value="autre">Autre</MenuItem>
                                        </SelectController>
                                    </Grid>
                                    <Grid item xs={12} className={styles.textalign}>
                                        <p>Votre CV</p>
                                        <input type="file" name="cv"></input>
                                    </Grid>
                                    <Grid item xs={12} className={styles.textalign}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={!isValid || !isDirty || isSubmitting}
                                            className={styles.buttonsend}
                                        >
                                            ENVOYER
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="/forgetpassword" className={styles.colorlinkpurple}>
                                                    Mot de passe oublié
                                                </Link>
                                            </Grid>
                                            <Grid item xs>
                                                <Link href="/login" className={styles.colorlinkpurple}>
                                                    {"Connexion"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Container >
            </Grid>
            <Snackbar open={openErreur} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Inscription invalide
                </Alert>
            </Snackbar>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseErreur} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseErreur} severity="success" sx={{ width: '100%' }}>
                    Merci pour votre inscription. Regardez votre mail pour confirmer votre compte.
                </Alert>
            </Snackbar>
            <Grid item xs={3} />
        </Grid>
        // </>
    );
}