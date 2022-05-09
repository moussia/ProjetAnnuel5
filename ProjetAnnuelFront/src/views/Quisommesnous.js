import { Grid } from '@mui/material';
import styles from '../style/quisommesnous.module.css';

export const Quisommesnous = () => {

    return (
        <Grid container-fluid spacing={2}>
            <Grid item xs={12} md={12} className="imageaccueil textalign">
                <h1>DÉCOUVREZ NOTRE ASSOCIATION SOS PARENTS
                    à Paris (75), Île-de-France</h1>
                <h2>Notre principe fondateur ? « Urgence, Permanence et Continuité des soins 365 jours par an ! »</h2>
                <p>SOS Médecins est, depuis sa mise en place par le Docteur Marcel Lascar, une structure associative entièrement autofinancée.
                    Nous intervenons pour des urgences médicales générales, hors urgences vitales,
                    grâce à l’intervention rapide de nos médecins généralistes urgentistes dans l’ensemble du territoire français.</p>
            </Grid>
            <Grid container>
                <Grid item xs={4}>
                    coucou
                </Grid>
                <Grid item xs={4}>
                    coucou

                </Grid>
                <Grid item xs={4}>
                    coucou
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <h2>AIDER LE PATIENT EN ÎLE-DE-FRANCE :</h2>
                    <h3>Une vocation nationale et des interventions départementales</h3>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <p>IMAGE</p>
                </Grid>
                <Grid item xs={6}>
                    <p>Acteur majeur de la veille sanitaire en Île-de-France, SOS Médecins Grand Paris assure la prise en charge des urgences médicales et des soins non programmés, des urgences non vitales et la permanence des soins à Paris (75), dans le Val-de-Marne (94), en Seine-Saint-Denis (93) et dans les Hauts-de-Seine (92).

                        Nos médecins urgentistes travaillent également de concert avec l’Institut national de Veille Sanitaire (InVS), la Cellule interrégionale d’épidémiologie (Cire) et l’Agence Régionale de Santé (ARS) pour la surveillance des épidémies saisonnières comme les grippes, gastro-entérites, bronchiolites, rougeoles, asthmes… sur les conséquences liées à certains phénomènes climatiques et pour l’enrichissement des données de santé.

                        SOS Médecins Grand Paris, c’est aussi des interventions dans les :

                        Maisons de retraites
                        EHPAD
                        Établissements pénitenciers…
                        Et des partenaires comme :

                        L’Agence Régionale de Santé (ARS)
                        SAMU
                        La brigade des Sapeurs-Pompiers de Paris (BSPP)…</p>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <h2>LES 7 POINTS DE LA CHARTE SOS MÉDECINS FRANCE</h2>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={3}>
                    <p>IMAGE</p>
                    <p>Disponibilité 24h/24 et 365 jours/an</p>
                </Grid>
                <Grid item xs={3}>
                    <p>IMAGE</p>
                    <p>Médecins urgentistes expérimentés et rodés à l’urgence</p>
                </Grid>
                <Grid item xs={3}>
                    <p>IMAGE</p>
                    <p>Moyens diagnostiques et thérapeutiques</p>
                </Grid>
                <Grid item xs={3}>
                    <p>IMAGE</p>
                    <p>Médecins disponibles tout au long de leur garde</p>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={4}>
                    <p>IMAGE</p>
                    <p>Interventions rapides et radioguidées dans un véhicule blanc</p>
                </Grid>
                <Grid item xs={4}>
                    <p>IMAGE</p>
                    <p>Remise d’un bilan d’intervention au médecin traitant</p>
                </Grid>
                <Grid item xs={4}>
                    <p>IMAGE</p>
                    <p>Autonomie financière totale des associations</p>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <h3>Prenez rendez-vous par téléphone ou en ligne</h3>
                </Grid>
                <Grid item xs={4}>
                    <button> PRENEZ RENDEZ-VOUS EN LIGNE</button>
                </Grid>
            </Grid>
        </Grid>
    );
}