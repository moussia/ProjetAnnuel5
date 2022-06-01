import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller } from "react-hook-form"
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

export const PasswordController = ({ control, name, rules, label, required, ...props }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
                <FormControl {...props}>
                    <InputLabel>{label}</InputLabel>
                    <OutlinedInput
                        label={label}
                        type={showPassword ? 'text' : 'password'}
                        value={value}
                        required={required}
                        onChange={onChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...props}
                    />
                </FormControl>
            )}
        />

    );
}