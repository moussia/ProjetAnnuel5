import { Grid } from '@mui/material';
import * as React from 'react';
import styles from '../style/contact.module.css';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

export const Contact = () => {

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    const {
        formState: { errors },
        control
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            prenom: '',
            nom: '',
            codepostal: '',
            adresse: '',
            ville: '',
            telephone: ''
        }
    });

    return (
        <div className="coco" >
            <Grid item xs={12} className="image-nature">
                <div className="centrer">
                    <h1>Nous contacter</h1>
                    <h2>Votre bien être est le nôtre</h2>
                </div>
            </Grid>
            <Grid container className="">

                <Grid item xs={4} className="centrer paddingcinq">
                    <div>
                        <p>
                            {/* <img src={require('../images/appel.png')} alt="prof" /> */}
                            +33 1 76 40 35 56 </p>
                    </div>

                    <p>    mailinfos@feeli.io</p>
                    <p>   Feeli SAS,</p>
                    <p>    88 avenue Charles de Gaulle,</p>
                    <p> 92200 Neuilly Sur Seine</p>
                </Grid>
                <Grid className="white paddingcinq" item xs={8}>
                    <form className='inputcenter'>
                        <p className='centrer'>Egalement, vous pouvez utiliser notre formulaire de contact</p>

                        <Grid spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label='Nom'
                                    className='signupInput'
                                    name='nom'
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
                                <TextField
                                    required
                                    fullWidth
                                    label='Email'
                                    className='signupInput'
                                    name='Email'
                                    margin="normal"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Veuillez saisir minimum deux caractères.'
                                        }
                                    }}
                                    variant="standard"
                                    control={control}
                                    error={errors.email ? true : false}
                                    helperText={errors?.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label='Sujet'
                                    className='signupInput'
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
                                <TextField
                                    required
                                    fullWidth
                                    label='Commentaire'
                                    className='signupInput'
                                    name='Commentaire'
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
                            <Grid className='centrer' item xs={12}>
                                <ColorButton variant="contained" size="large" >ENVOYER</ColorButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <Grid container className="imagedoctor">
                <Grid item xs={12}>
                    <h2 className='centrer'>vous etes un profesionnel de la petite enfance ?</h2>
                </Grid>
            </Grid>
            <Grid container className="white ">
                <Grid item xs={12}>
                    <h2 className='centrer'>Un service d'excellence</h2>
                </Grid>
                <Grid item xs={4}>
                    <img src={require('../images/prof.png')} alt="prof" className='images-contact' />
                    <div className="centrer">
                        <h2>Service d'informations</h2>
                        <p>  Est prévu pour tous renseignements sur notre service infos@feeli.io</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <img src={require('../images/certif.png')} alt="certif" className='images-contact' />
                    <div className="centrer">
                        <h2>Données sécurisées et cryptées</h2>
                        <p>     Vous êtes propriétaire de vos données
                            de santé</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <img src={require('../images/traitement.png')} alt="traitement" className='images-contact' />
                    <div className="centrer">
                        <h2>Votre prescription et traitement en ligne</h2>
                        <p>     Disponible sous format numérique
                            en moins de deux heures</p>
                    </div>
                </Grid>

            </Grid>

        </div >
    );
}
