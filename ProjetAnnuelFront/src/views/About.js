import React from 'react';
import Fade from 'react-reveal/Fade';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import './About.css';

const advantageArray = [
    {
        icon: 'france.svg',
        title: 'Fabrication 100% Francaise',
        text:
            'Tous les produits que nous produisons sont 100% d’origine Francaise.',
    },
    {
        icon: 'lock.svg',
        title: 'Paiements sécurisés',
        text: 'Les paiements sont 100% sécurisés via la plateforme Stripe.',
    },
    {
        icon: 'certificate.svg',
        title: 'Materiaux de haute qualités',
        text: 'Nos produits sont de très haute qualités.',
    },
    {
        icon: 'truck.svg',
        title: 'Livraison offerte',
        text: 'Livraison offerte à partir de 300€.',
    },
];

function About() {
    return (
        <div className='body'>
            <div className='container-fluid no-padding room'>
                <Header />

                <img
                    alt='wood work'
                    src={process.env.PUBLIC_URL + '/images/about/carpentry.jpg'}
                    className='about-img'
                ></img>
                <div className='about-content'>
                    <div className='row'>
                        <div className='container'>
                            <Fade left>
                                <h2 className='col-md-8 offset-md-2 col-lg-6 offset-lg-3 no-padding about-text default-reveal'>
                                    Qui sommes-nous ?
                                </h2>
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container about-text-container'>
                <Fade left delay={200}>
                    <div className='row'>
                        <h4 className='col-12'>
                            La menuiserie : notre domaine
                        </h4>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            Une société jeune et dynamique au service des gens
                            exigeants et amoureux du bois. Des délais
                            raisonnables et respectés, des prix abordables et
                            une qualité irréprochable. C'est tout cela et bien
                            plus encore.
                            <br />
                            <br />
                            WoodMonkey c'est : De la menuiserie tout simplement,
                            tout naturellement.
                        </div>
                    </div>
                </Fade>
            </div>
            <div className='list_advantage container-fluid'>
                {advantageArray.map((icon, i) => (
                    <div className={'col-md-3 icon' + i}>
                        <Fade left delay={i * 300}>
                            <img
                                alt='icon'
                                src={
                                    process.env.PUBLIC_URL +
                                    '/images/about/' +
                                    icon.icon
                                }
                            ></img>
                            <h4>{icon.title}</h4>
                            <p>{icon.text}</p>
                        </Fade>
                    </div>
                ))}
            </div>
            <div className='container-fluid'>
                <div className='about-blocks'>
                    <div className='about-block-container row align-items-center'>
                        <Fade left>
                            <div className='col-12 col-md-6'>
                                <h4>Made in France</h4>
                                <p>
                                    Fabrication entièrement élaborée en France.
                                    Un coup de foudre arrive aussi pour un
                                    meuble. Vous avez vu chez un ami ou même
                                    dans un catalogue un meuble qui vous a fait
                                    craquer ? Rien de plus simple pour le
                                    réaliser pour vous. Vous avez l'esprit
                                    artistique et vous vous êtes fait vous-même
                                    une idée de votre œuvre ? Nous répondons
                                    présent pour la concrétiser ! Moderne,
                                    classique, avant-gardiste, nos ébénistes
                                    expérimentés vous conseillent et vous
                                    guident pour le meilleur de vos choix.
                                </p>
                            </div>
                            <div className='offset-1 col-5'>
                                <img
                                    alt='wood work'
                                    className='block-img'
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/images/about/work1.png'
                                    }
                                ></img>
                            </div>
                        </Fade>
                    </div>

                    <div className='about-block-container row align-items-center'>
                        <Fade left>
                            <div className='col-5'>
                                <img
                                    alt='wood work'
                                    className='block-img'
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/images/about/work2.png'
                                    }
                                />
                            </div>
                            <div className='col-12 offset-md-1 col-md-6'>
                                <h4>Des artisants de qualité</h4>
                                <p>
                                    Vous avez une simple idée ou une idée
                                    innovante et précise, notre expert artisan
                                    ébéniste est disponible pour en discuter et
                                    concrétiser votre meuble. Une idée du coût,
                                    rien de plus simple. Notre configurateur 3D
                                    et notre menuisier sont présents pour vous
                                    aider. Realisez votre devis pour un projet
                                    de qualité Armoires, baies vitrées,
                                    bibliotheques, chambres à coucher, cuisines,
                                    fenêtres, moulures, parquet etc
                                </p>
                            </div>
                        </Fade>
                    </div>
                    <div className='about-block-container row align-items-center'>
                        <Fade left>
                            <div className='col-12 col-md-6'>
                                <h4>Le bois dans tous ses états</h4>
                                <p>
                                    Les cuisines qui font aimer cuisiner. Les
                                    chambres à coucher qui font rêver de
                                    bonheur. Les bibliothèques sur-mesure à la
                                    hauteur de vos livres vous feront voyager.
                                    Des dressing sur-mesure où il fera bon
                                    ranger et s'habiller.
                                </p>
                            </div>
                            <div className='offset-1 col-5'>
                                <img
                                    alt='wood work'
                                    className='block-img'
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/images/about/work3.png'
                                    }
                                />
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;