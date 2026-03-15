import { TextField, type TextFieldProps } from "@mui/material";

export function EmailField(props: Omit<TextFieldProps, "variant">) {
    const {
        id = "email",
        name = "email",
        label = "Email",
        autoComplete = "email",
        ...rest
    } = props;
    return (
        <TextField
            required
            fullWidth
            id={id}
            label={label}
            name={name}
            autoComplete={autoComplete}
            autoFocus
            color="primary"
            {...rest}
        />
    );
}
