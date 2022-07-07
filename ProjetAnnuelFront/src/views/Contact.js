import { Alert, Grid } from '@mui/material';
import * as React from 'react';
// import styles from '../style/contact.module.css';
import styles from '../style/bonjour.module.css';
import { useForm } from "react-hook-form";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { TextController } from '../components/form/textController';
import Snackbar from '@mui/material/Snackbar';
import request from '../utils/request';

export const Contact = () => {
    const [openErreur, setOpenErreur] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    const {
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            name: '',
            sujet: '',
            commentaire: '',
        }
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        request.post(`/user/sendMailContact`, data)
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
        <div className="coco" >
            <Grid container className={styles.nopadding && styles.room}>
                <img
                    alt='furniture'
                    src={require('../images/nature.jpg')}
                    className={styles.roomimg}
                />
                <Grid Grid item xs={12} className={styles.roomcontent}>
                    <div className='row'>
                        <h1>Contactez-nous</h1>
                    </div>

                    <div className={styles.arrowimg}>
                        <AnchorLink href='#list_icon'>
                            <img
                                alt='arrow'
                                height='16'
                                src={require('../images/down-arrow.png')}
                            />
                        </AnchorLink>
                    </div>
                </Grid>
            </Grid>

            <Grid
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={styles.margintopdeux}
                container id='list_icon'>
                <Grid item xs={1} >
                </Grid>
                <Grid item xs={4} className={styles.centrer}>
                    <div>
                        <p>
                            <img
                                alt='logo'
                                height='auto'
                                width='10%'
                                src={require('../images/appel.png')}
                            />
                            +33 1 76 40 35 56 </p>
                        <p>
                            <img
                                alt='logo'
                                height='auto'
                                width='10%'
                                src={require('../images/email (1).png')}
                            />
                            sosparentsoff@gmail.com </p>
                        <p>
                            <img
                                alt='logo'
                                height='auto'
                                width='10%'
                                src={require('../images/marque-de-localisation.png')}
                            />
                            88 rue petit, 75019
                            Paris</p>
                    </div>
                </Grid>
                <Grid className={styles.white} item xs={6}>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <p className={styles.centrer}>Laissez-nous un message</p>
                        <Grid spacing={2}>
                            <Grid item xs={12}>
                                <TextController
                                    required
                                    fullWidth
                                    label='Nom'
                                    name='name'
                                    margin="normal"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Veuillez saisir minimum deux caractères.'
                                        }
                                    }}
                                    variant="standard"
                                    control={control}
                                    error={errors.nom ? true : false}
                                    helperText={errors?.nom?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextController
                                    required
                                    fullWidth
                                    label='Email'
                                    name='email'
                                    margin="normal"
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
                                    variant="standard"
                                    control={control}
                                    error={errors.email ? true : false}
                                    helperText={errors?.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextController
                                    required
                                    fullWidth
                                    label='Sujet'
                                    name='sujet'
                                    margin="normal"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Veuillez saisir minimum deux caractères.'
                                        }
                                    }}
                                    variant="standard"
                                    control={control}
                                    error={errors.sujet ? true : false}
                                    helperText={errors?.sujet?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextController
                                    required
                                    fullWidth
                                    label='Commentaire'
                                    name='commentaire'
                                    margin="normal"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Veuillez saisir minimum deux caractères.'
                                        }
                                    }}
                                    variant="standard"
                                    control={control}
                                    error={errors.commentaire ? true : false}
                                    helperText={errors?.commentaire?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ColorButton className={styles.widthcent} type="submit" variant="contained" size="large" >ENVOYER</ColorButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={1} >
                </Grid>
            </Grid >
            <Grid container
                justifyContent="center"
                alignItems="center" className={styles.colorblancfond} >
                <Grid item xs={4} className={styles.imagedoctor} >
                    <h2 className={styles.titredeuxqui}>Un service d'excellence</h2>
                </Grid>

            </Grid >
            <Grid container className={styles.bandeaucontact} >
                <Grid item xs={4}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        className={styles.marginright}
                        src={require('../images/prof.png')}
                    />
                    <div className={styles.centrer}>
                        <h4>Service d'informations</h4>
                        <p>  Est prévu pour tous renseignements sur notre service infos@sosparentsoff.fr</p>
                    </div>
                </Grid >
                <Grid item xs={4}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        className={styles.marginright}
                        src={require('../images/certif.png')}
                    />
                    <div className={styles.centrer}>
                        <h4>Données sécurisées et cryptées</h4>
                        <p>     Vous êtes propriétaire de vos données
                            de santé</p>
                    </div>
                </Grid >
                <Grid item xs={4}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        className={styles.marginright}
                        src={require('../images/traitement.png')}
                    />
                    <div className={styles.centrer}>
                        <h4>Votre prescription et traitement en ligne</h4>
                        <p>     Disponible sous format numérique
                            en moins de deux heures</p>
                    </div>
                </Grid >
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseErreur} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleCloseErreur} severity="success" sx={{ width: '100%' }}>
                        Message envoyé
                    </Alert>
                </Snackbar>
                <Snackbar open={openErreur} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Erreur
                    </Alert>
                </Snackbar>
            </Grid >

        </div >
    );
}
