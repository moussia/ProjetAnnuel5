import React from 'react';
import Fade from 'react-reveal/Fade';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styles from '../style/bonjour.module.css';
import Grid from '@mui/material/Grid';
import Lottie from 'react-lottie';
import * as LottieAccueil from '../images/lotties/24074-baby.json';


const lottiebaby = {
    loop: true,
    autoplay: true,
    animationData: LottieAccueil,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

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
            text: 'Obtenez des conseils',
        },
    ];

    return (
        <div className={styles.body && styles.home}>
            <Grid container className={styles.nopadding && styles.room}>
                <img
                    alt='furniture'
                    src={require('../images/jonathan-borba-CgWTqYxHEkg-unsplash.jpg')}
                    className={styles.roomimg}
                />
                <Grid Grid item xs={12} className={styles.roomcontent}>
                    <div className='row'>
                        <Fade left>
                            <h2 className={styles.nopadding && styles.roomtext && styles.textbutton}>
                                Ne craquez plus, appelez nous pour vous aidez... <br></br>
                                Vous êtes fatigué ? Vous n'arrivez pas à calmer bébé ? Soufflez un peu et contactez nous !
                                <br></br>   SOS PARENTS  <br></br>
                                Téléconsultations -
                                message
                                24h/24, 7j/7
                            </h2>
                        </Fade>
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

            <Grid container id='list_icon' spacing={1} className={styles.icon_desc}>
                {iconsArray.map((icon, i) => (
                    <Grid item xs={3} key={i} className={styles.textalign}>
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
            <Grid container spacing={2} className={styles.margintopdeux}>
                <Grid item xs={6}>
                    <Lottie options={lottiebaby}
                        height={"50%%"}
                        width={"50%"} />
                </Grid>
                <Grid item xs={6}>
                    <div
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '60%'
                        }}
                    >
                        <p>
                            Proposant une prise en charge pour vos bébés, 7j/7 et 24h/24 dans toute l'Europe,
                            SOS Parents assure le soutien à la parantalité sur votre
                            lieu de travail ou encore en l’absence de votre médecin traitant.
                            Dès la réception de votre demande,
                            nos équipes vous conseillent et vous accompagnent dans les meilleures
                            conditions.
                            Pour toute demande, contactez-nous.
                        </p>
                    </div>

                </Grid>
            </Grid >
        </div >
    );
}