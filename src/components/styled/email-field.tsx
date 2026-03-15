import {
    TextField as MuiTextField,
    type TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { forwardRef } from "react";

export type EmailFieldProps = Omit<MuiTextFieldProps, "variant" | "type">;

export const EmailField = forwardRef<HTMLDivElement, EmailFieldProps>(
    (props, ref) => {
        const {
            autoComplete = "email",
            required = true,
            fullWidth = true,
            slotProps,
            ...rest
        } = props;

        return (
            <MuiTextField
                ref={ref}
                required={required}
                fullWidth={fullWidth}
                autoComplete={autoComplete}
                type="email"
                color="primary"
                {...rest}
                slotProps={{
                    ...slotProps,
                    input: {
                        ...slotProps?.input,
                    },
                }}
            />
        );
    },
);

EmailField.displayName = "EmailField";
