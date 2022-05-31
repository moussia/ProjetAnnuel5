import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller } from "react-hook-form"

export const PasswordController = ({ control, name, rules, label, onBlur, error, helperText, required, InputProps, ...props }) => {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Controller
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            name={name}
            control={control}
            rules={rules}
            onChange={handleChange('password')}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
            label="Password"
        />
        // <Controller
        //     control={control}
        //     name={name}
        //     rules={rules}
        //     render={({ field: { onChange, value } }) => (
        //         <TextField
        //             label={label}
        //             onChange={onChange}
        //             value={value}
        //             onBlur={onBlur}
        //             name={name}
        //             error={error}
        //             helperText={helperText}
        //             required={required}
        //             InputProps={InputProps}
        //             InputLabelProps={{ shrink: value ? true : false }}
        //             {...props}
        //         />
        //     )}
        // />

    );
}