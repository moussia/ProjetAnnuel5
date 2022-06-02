import * as React from 'react';
import Grid from '@mui/material/Grid';
import BabyImage from '../images/garrett-jackson-oOnJWBMlb5A-unsplash.jpg';
import Button from '@mui/material/Button';
import styles from '../style/home.module.css';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


export default function Home() {

    // const iconsArray = [
    //     {
    //         icon: 'friend.png',
    //         text: 'Discuter 7j/7 et 24h/24 avec des professionnels',
    //     },
    //     {
    //         icon: 'free.png',
    //         text: 'Complètement gratuit',
    //     },
    //     {
    //         icon: 'massage.png',
    //         text: 'Faites vous aider',
    //     },
    //     {
    //         icon: 'heart.png',
    //         text: 'Faites un don en toute confiance',
    //     },
    // ];

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color,
                backgroundColor: color,
                height: 1,
                border: 'solid',
                margin: '3%',
                width: "100%"
            }}
        />
    );
    return (
        <div>
            <Grid container className={styles.imageaccueil}>
                <div className={styles.textcenter && styles.colorwhite && styles.positionrelative} >
                    <div className={styles.positionabsolute}>
                        <h1>Ne craquez plus, appelez nous pour vous aidez...</h1>
                        <p>  Vous êtes fatigué ? Vous n'arrivez pas à calmer bébé ? Soufflez un peu et contactez nous !
                            SOS PARENTS GRAND PARIS :
                            Visites d'aides à domicile
                            consultations
                            téléconsultations
                            24h/24, 7j/7
                            (Paris 75, 92, 93, 94)
                        </p>
                    </div>
                </div>
            </Grid >
            <Grid container spacing={4} className={styles.textcenter}>
                <Grid item xs={4}>
                    <ColorButton variant="contained" size="large" className={styles.textcenter}>Demander une visite à domicile</ColorButton>
                </Grid>
                <Grid item xs={4}>
                    <ColorButton variant="contained" size="large" className={styles.textcenter}>Demander une consultation par téléphone</ColorButton>
                </Grid>
                <Grid item xs={4}>
                    <ColorButton variant="contained" size="large" className={styles.textcenter}>Besoin de vous confier ?</ColorButton>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <div className={styles.textaccueil}>
                    <h3 className={styles.toto}> SOS MÉDECINS GRAND PARIS :</h3>
                    <p>   Visites médicales à domicile
                        (Paris 75, 92, 93, 94)
                        Proposant une prise en charge des urgences médicales et des soins de médecine générale non programmés, 7j/7 et 24h/24 à Paris (75) ainsi que dans la plupart des communes des départements suivants : Seine-Saint-Denis (93), Hauts-de-Seine (92) et Val-de-Marne (94), SOS Médecins assure les visites de médecine générale, d’urgence, de permanence et de continuité des soins, à votre domicile, sur votre lieu de travail ou encore en l’absence de votre médecin traitant.

                        Dès la réception de votre appel ou de votre demande de visite médicale à domicile SOS Médecins via notre interface Internet, nos équipes vous conseillent et vous accompagnent dans les meilleures conditions, pendant que vous attendez l’arrivée du médecin urgentiste.

                        Pour toute demande, contactez-nous. </p>
                </div>
            </Grid>

            {/* <div style={{ borderTop: "10px solid #FFCC09 ", marginLeft: 20, marginRight: 20 }}></div> */}
            <ColoredLine color="purple" />

            <Grid container spacing={4} className={styles.colorgray}>
                <Grid item xs={6} md={5}>
                    <img src={BabyImage} alt="baby" className={styles.imagebaby} />

                </Grid>
                <Grid item xs={6} md={7}>
                    <h2>VOUS ÊTES UN PROFESSIONNEL DES TOUTS PETITS ?</h2>
                    <h2>Rejoignez les équipes de SOS Parents Grand Paris</h2>
                    <p>Vous souhaitez mettre vos compétences médicales au service de particuliers en Île-de-France ?

                        Nous recherchons régulièrement des médecins généralistes et urgentistes pour assurer des visites à domicile. Ainsi que des téléopérateurs pour la prise en charge des demandes de nos patients et la régulation médicale.</p>
                    <ColorButton variant="contained" size="large" className={styles.textcenter}>Je dépose ma candidature</ColorButton>
                </Grid>
            </Grid>
        </div >

    );
}