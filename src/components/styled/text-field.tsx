import React from "react";
import {
    TextField as MuiTextField,
    type TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export type TextFieldProps = Omit<MuiTextFieldProps, "variant">;

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
    (props, ref) => {
        const {
            autoComplete = "off",
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

TextField.displayName = "TextField";
