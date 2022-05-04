import { Controller } from "react-hook-form"
import { TextField } from '@mui/material';

export const TextController = ({ control, name, rules, label, onBlur, error, helperText, required, InputProps, ...props }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value } }) => (
                <TextField
                    label={label}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    name={name}
                    error={error}
                    helperText={helperText}
                    required={required}
                    InputProps={InputProps}
                    InputLabelProps={{ shrink: value ? true : false }}
                    {...props}
                />
            )}
        />
    );
}