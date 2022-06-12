import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'

export const StepperChoice = ({ choix, setChoix }) => {

    const handleChange = (e) => setChoix(e.target.value);

    return (
        <div>
            <p>De qu'elle manière voulez-vous être aidez ?</p>
            <FormControl>
                <FormLabel id="choix">Choix</FormLabel>
                <RadioGroup row value={choix} onChange={handleChange}>
                    <FormControlLabel value="tel" control={<Radio />} label="Téléphone" />
                    <FormControlLabel value="chat" control={<Radio />} label="Chat" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};