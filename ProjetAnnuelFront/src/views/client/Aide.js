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
    const [choix, setChoix] = React.useState('tel');
    const [symptomes, setSymptomes] = React.useState('malade');

    const handleOpen = () => {
        setOpen(true);
    };

    React.useEffect(() => {
        console.log(choix);
    }, [choix]);

    React.useEffect(() => {
        console.log(symptomes);
    }, [symptomes]);

    const handleFinish = () => {
        axios({ url: `http://localhost:3003/user/sendReservation`, method: 'POST', data: { choix: choix, symptomes: symptomes }, withCredentials: true })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
        handleNext();
    };

    const handleClose = () => {
        setOpen(false);
    };

    // _______________
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // ——————————————————————————
    return (
        <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <p>Attention ! Pensé à vérifié votre numéro de téléphone <Link to="/moncompte" color="inherit">
                dans votre compte
            </Link>, pour qu'un professionnel puisse vous contacter.</p>
            <Button size="large" variant="contained" color="success" onClick={handleOpen}>Demander de l'aide</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 800 }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
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
                            {activeStep === 2 && <StepperConfirmation choix={choix} setChoix={setChoix} />}
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
        </Grid>
    );
}