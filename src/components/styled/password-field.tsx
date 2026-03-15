import React, { useState, useCallback } from "react";
import {
    TextField,
    IconButton,
    InputAdornment,
    type TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export type PasswordFieldProps = Omit<TextFieldProps, "type" | "variant">;

export const PasswordField = React.forwardRef<
    HTMLDivElement,
    PasswordFieldProps
>((props, ref) => {
    const {
        autoComplete = "current-password",
        required = true,
        fullWidth = true,
        slotProps,
        ...rest
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const handleMouseDown = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        },
        [],
    );

    return (
        <TextField
            ref={ref}
            required={required}
            fullWidth={fullWidth}
            autoComplete={autoComplete}
            type={showPassword ? "text" : "password"}
            {...rest}
            slotProps={{
                ...slotProps,
                input: {
                    ...slotProps?.input,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword
                                        ? "hide password"
                                        : "show password"
                                }
                                onClick={toggleVisibility}
                                onMouseDown={handleMouseDown}
                                edge="end"
                                size="medium"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
});

PasswordField.displayName = "PasswordField";
