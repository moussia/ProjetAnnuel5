import { FormControl, InputLabel, RadioGroup, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export const SelectController = ({ control, name, rules, label, onBlur, error, helperText, children, ...props }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value } }) => (
                <FormControl fullWidth name="job">
                    <InputLabel>{label}</InputLabel>
                    <Select
                        label={label}
                        rules={rules}
                        onChange={onChange}
                        value={value}
                        onBlur={onBlur}
                        name={name}
                        error={error}
                        helperText={helperText}
                        {...props}
                    >
                        {children}
                    </Select>
                </FormControl>
            )}
        />
    );
}



