import { Button, Grid } from '@mui/material';
// import styles from '../style/quisommesnous.module.css';
import * as React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { NavLink } from 'react-router-dom';
import styles from '../style/bonjour.module.css';

export const Quisommesnous = () => {

    return (
        <Grid item xs={12} md={12}>
            <Grid container className={styles.nopadding && styles.room}>
                <img
                    alt='furniture'
                    src={require('../images/aditya-romansa-5zp0jym2w9M-unsplash.jpg')}
                    className={styles.roomimg}
                />
                <Grid Grid item xs={12} className={styles.roomcontent}>
                    <div className='row'>
                        <h1>Association SOS PARENTS   </h1>
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
            <Grid container spacing={3} id='list_icon' >
                <Grid item xs={12} className={styles.titrequi}>
                    <h2>Notre principe fondateur ? <br></br>« Urgence, Permanence et Soutien 365 jours par an ! »</h2>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6}>
                    <p className={styles.textnormal}>SOS Parents est, depuis sa mise en place par Moussia MOTTAL, une structure associative.
                        Nous intervenons pour des urgences parentales générales, hors urgences vitales,
                        grâce à l’intervention rapide de nos éducateurs, pédiatre, parents.. de partout dans le monde.
                        <br></br>    Si vous avez besoin d'un conseil, d'une oreille pour vous écouter, nous sommes à votre disposition.
                        <br></br>   Vous n'êtes pas seul !
                    </p>
                </Grid>
                <Grid item xs={4}>
                    <img className={styles.imagebck} src={require('../images/qui.jpg')} alt="qui" />
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
            <Grid container className={styles.colorblancfond}>
                <Grid item xs={12} className={styles.titredeuxqui}>
                    <h2>Aider le parent :</h2>
                    <h3>Une vocation nationale et des interventions départementales</h3>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <h2 className={styles.textalign}>Les 8 points de la charte SOS Parents</h2>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={3} className={styles.textalign}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        src={require('../images/disponibilite.png')}
                    />
                    <p>Disponibilité 24h/24 et 365 jours/an</p>
                </Grid>
                <Grid item xs={3} className={styles.textalign}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        src={require('../images/education.png')}
                    />
                    <p>Personnelles expérimentés</p>
                </Grid>
                <Grid item xs={3} className={styles.textalign}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        src={require('../images/question.png')}
                    />
                    <p>Nous répondons à vos questions</p>
                </Grid>
                <Grid item xs={3} className={styles.textalign}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        src={require('../images/gens.png')}
                    />
                    <p>Disponible de partout</p>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={3} className={styles.textalign}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        src={require('../images/sablier.png')}
                    />
                    <p>Interventions rapides</p>
                </Grid>
                <Grid item xs={3} className={styles.textalign}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        src={require('../images/lamour (1).png')}
                    />
                    <p>Nous vous aidons avec amour</p>
                </Grid>
                <Grid item xs={3} className={styles.textalign}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        src={require('../images/conversation.png')}
                    />
                    <p>Tous bénévoles</p>
                </Grid>
                <Grid item xs={3} className={styles.textalign}>
                    <img
                        alt='logo'
                        height='auto'
                        width='20%'
                        src={require('../images/faq.png')}
                    />
                    <p>Une question ? N'hésitez pas</p>
                </Grid>
            </Grid>
            <hr></hr>
            <Grid container className={styles.dernierbandeau}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6}>
                    <h3>N'attendez plus rendez-vous par téléphone ou en ligne</h3>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/login'>
                        <Button variant="contained" color="secondary">
                            PRENEZ RENDEZ-VOUS EN LIGNE
                        </Button>
                    </NavLink>

                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </Grid>
    );
}