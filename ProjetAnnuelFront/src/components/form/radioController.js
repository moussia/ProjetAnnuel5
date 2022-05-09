import { RadioGroup } from "@mui/material";
import { Controller } from "react-hook-form";

export const RadioController = ({ control, name, rules, label, onBlur, error, helperText, ...props }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value } }) => (
                <RadioGroup
                    label={label}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    name={name}
                    error={error}
                    helperText={helperText}
                    {...props}
                />
            )}
        />
    );
}