import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { StepperChoice } from '../../components/modal/StepperChoice';
import { StepperProblem } from '../../components/modal/StepperProblem';
import { StepperConfirmation } from '../../components/modal/StepperConfirmation';
import { Link } from 'react-router-dom';
import { getSocket } from '../../utils/socket';
import styles from '../../style/Payment.module.css';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const steps = ['Choix', 'Symptômes', 'Confirmation'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export const Aide = () => {
    const [open, setOpen] = React.useState(false);
    const [waitingTime, setWaitingTime] = React.useState(10);
    const [reservationId, setReservationId] = React.useState(null);
    const [match, setMatch] = React.useState(false);
    const [choix, setChoix] = React.useState('tel');
    const [symptomes, setSymptomes] = React.useState('malade');
    const socket = getSocket();

    React.useEffect(() => {
        socket.emit("join_room", reservationId);
        socket.on("receive_match", () => {
            setMatch(reservationId);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reservationId]);

    const handleOpen = () => setOpen(true);

    React.useEffect(() => {
        axios({ url: `${process.env.REACT_APP_SERVER}/user/closeReservation`, method: 'PUT', withCredentials: true })
    }, []);

    const handleFinish = () => {
        axios({ url: `${process.env.REACT_APP_SERVER}/user/sendReservation`, method: 'POST', data: { choix: choix, symptomes: symptomes }, withCredentials: true })
            .then((data) => {
                setWaitingTime(data.data.waitingTime);
                setReservationId(data.data._id);
            })
            .catch((err) => console.log(err));
        handleNext();
    };

    const handleClose = () => {
        setOpen(false);
    };

    // _______________
    const [activeStep, setActiveStep] = React.useState(0);


    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" className={styles.margintop}>
            <Card className={styles.verticalcenter}>
                <CardContent>
                    <p className={styles.colorred}>Attention ! Pensé à vérifier votre numéro de téléphone <Link to="/moncompte" color="inherit">
                        dans votre compte
                    </Link>, pour qu'un professionnel puisse vous contacter.</p>
                    <Button size="large" className={styles.widthcent} variant="contained" color="success" onClick={handleOpen}>Demander de l'aide</Button>
                    <Modal open={open} onClose={handleClose}>
                        <Box sx={{ ...style, width: 800 }}>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        Merci de votre confiance.
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button>Envoyer</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {activeStep === 0 && <StepperChoice choix={choix} setChoix={setChoix} />}
                                    {activeStep === 1 && <StepperProblem symptomes={symptomes} setSymptomes={setSymptomes} />}
                                    {activeStep === 2 && <StepperConfirmation choix={choix} setChoix={setChoix} waitingTime={waitingTime} match={match} />}
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        {activeStep !== steps.length - 1 && <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>}
                                        <Box sx={{ flex: '1 1 auto' }} />

                                        {activeStep === steps.length - 2 && <Button type="submit" onClick={handleFinish}>
                                            FINISH
                                        </Button>}
                                        {activeStep < 1 && <Button type="submit" onClick={handleNext}>
                                            NEXT
                                        </Button>}

                                    </Box>
                                </React.Fragment>
                            )}
                        </Box>
                    </Modal>
                </CardContent>
            </Card>
        </Grid >
    );
}