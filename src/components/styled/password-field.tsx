import { TextField, type TextFieldProps } from "@mui/material";

export function PasswordField(props: Omit<TextFieldProps, "variant">) {
    const {
        id = "password",
        name = "password",
        label = "Password",
        autoComplete = "current-password",
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
