import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'

export const StepperProblem = ({ symptomes, setSymptomes }) => {

    const handleChange = (e) => setSymptomes(e.target.value);

    return (
        <div>
            <p>Qu'arrive t'il à votre enfant ?</p>
            <FormControl>
                <FormLabel id="symptome">Symptômes</FormLabel>
                <RadioGroup row value={symptomes} onChange={handleChange}>
                    <FormControlLabel value="malade" control={<Radio />} label="Malade" />
                    <FormControlLabel value="pleure" control={<Radio />} label="Pleure" />
                    <FormControlLabel value="dormir" control={<Radio />} label="Impossible de dormir" />
                    <FormControlLabel value="soutien" control={<Radio />} label="Besoin de soutien" />
                    <FormControlLabel value="otherSoutien" control={<Radio />} label="Autre" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};