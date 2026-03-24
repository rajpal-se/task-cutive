import { Box, Button, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "../../components/styled/text-field";
import { PasswordField } from "../../components/styled/password-field";
import { useVerifyResetPasswordOtp } from "../../apis";
import {
    verifyResetPasswordFormSchema,
    type VerifyResetPasswordFormValues,
} from "../../schemas";
import { toast } from "sonner";
import routes from "../../router/routes";

type VerifyOtpFormValues = VerifyResetPasswordFormValues & {
    confirmPassword: string;
};

export default function VerifyOtpUi({ email }: { email: string }) {
    const navigate = useNavigate();
    const { mutateAsync: verifyOtp, isPending } = useVerifyResetPasswordOtp();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<VerifyOtpFormValues>({
        resolver: yupResolver(verifyResetPasswordFormSchema),
        defaultValues: {
            otp: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: VerifyOtpFormValues) => {
        try {
            await verifyOtp({
                email,
                otp: data.otp,
                newPassword: data.newPassword,
            });
            toast.success("Password reset successful. Please login.");
            navigate(routes.login, { replace: true });
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "OTP verification failed",
            );
        }
    };

    const isDisabled = !email || isSubmitting || isPending;

    return (
        <ResetPasswordContainer>
            <Typography variant="h5" className="heading">
                Verify OTP
            </Typography>

            <Box
                component="form"
                className="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Controller
                    name="otp"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="OTP"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field, fieldState }) => (
                        <PasswordField
                            {...field}
                            autoComplete="new-password"
                            label="New Password"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field, fieldState }) => (
                        <PasswordField
                            {...field}
                            autoComplete="new-password"
                            label="Confirm Password"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    className="submitButton"
                    disabled={isDisabled}
                >
                    Verify OTP & Reset Password
                </Button>
                {!email ? (
                    <Typography
                        variant="body2"
                        color="error"
                        className="warning"
                    >
                        Please submit your email first to request OTP.
                    </Typography>
                ) : null}
            </Box>
        </ResetPasswordContainer>
    );
}

const ResetPasswordContainer = styled(Box)(({ theme }) => ({
    ".heading": {
        color: theme.palette.primary.main,
        mb: 3,
        fontWeight: 500,
    },
    ".form": {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        mt: theme.spacing(1),
    },
    ".submitButton": {
        alignSelf: "center",
        margin: "4px 0px",
    },
    ".warning": {
        textAlign: "center",
    },
}));
