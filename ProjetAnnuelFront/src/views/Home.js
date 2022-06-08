import React from 'react';
import Fade from 'react-reveal/Fade';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Button from '@mui/material/Button';
// import { Parallax } from 'react-parallax';
import { NavLink } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import ContactForm from '../components/ContactForm';
// import Maps from '../components/Maps';
import styles from '../style/bonjour.module.css';
import Grid from '@mui/material/Grid';

export default function Home() {
    const iconsArray = [
        {
            icon: 'free.png',
            text: 'Complètement gratuit',
        },
        {
            icon: 'massage.png',
            text: 'Detendez-vous',
        },
        {
            icon: 'friend.png',
            text: 'Confiez vous à des professionnels',
        },
        {
            icon: 'heart.png',
            text: 'Possibilité de faire des dons',
        },
    ];

    return (
        <div className={styles.body && styles.home}>
            {/* <div className='container-fluid nopadding room'> */}
            <div className={styles.nopadding && styles.room}>
                <img
                    alt='furniture'
                    src={require('../images/jonathan-borba-CgWTqYxHEkg-unsplash.jpg')}
                    className={styles.roomimg}
                />
                <div className={styles.roomcontent}>
                    <div className='row'>
                        <div className='container'>
                            <Fade left>
                                {/* <h2 className='col-md-10 offset-md-1 col-lg-8 offset-lg-2 nopadding roomtext'> */}
                                <h2 className={styles.nopadding && styles.roomtext}>
                                    Ne craquez plus, appelez nous pour vous aidez...
                                    Vous êtes fatigué ? Vous n'arrivez pas à calmer bébé ? Soufflez un peu et contactez nous !
                                    <br></br>   SOS PARENTS  <br></br>
                                    Téléconsultations -
                                    message
                                    24h/24, 7j/7
                                </h2>
                            </Fade>
                            <Fade left delay={750}>
                                <NavLink to='/login'>
                                    <Button
                                        name='button'
                                        variant='contained'
                                        value='configurator'
                                        color='primary'
                                        style={{ marginTop: '1em' }}
                                        size='medium'
                                        className='config-button'
                                    >
                                        Connectez-vous
                                    </Button>
                                </NavLink>
                            </Fade>
                        </div>
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
                </div>
            </div>

            <Grid container id='list_icon' spacing={1} className={styles.icon_desc}>
                {iconsArray.map((icon, i) => (
                    <Grid container xs={3} key={i}>
                        <Fade left delay={i * 300}>
                            <img
                                alt='icon'
                                className={styles.widthdix}
                                src={require('../images/' + icon.icon)}
                            />
                            <p>{icon.text}</p>
                        </Fade>
                    </Grid>
                ))}
            </Grid>
            <Grid container className={styles.hometextcontainer}>
                <Fade left>
                    <div className='row'>
                        <h4 className='col-12'>WoodMonkey</h4>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            Le bois granit et fait fleurir vos envies.
                            WoodMonkey fait de la menuiserie tout simplement,
                            tout naturellement. La passion du bois, des parfums
                            et des couleurs. La perfection et l’écoute sont nos
                            atouts. Le sur-mesure et le bois sont nos qualités.
                        </div>
                    </div>
                </Fade>
            </Grid>
        </div >
    );
}