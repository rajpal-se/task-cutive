import { Box, Button, styled, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmailField } from "../../components/styled/email-field";
import { useResetPassword } from "../../apis";
import {
    resetPasswordFormSchema,
    type ResetPasswordFormValues,
} from "../../schemas";
import { toast } from "sonner";

export default function ResetPasswordUi({
    email,
    setEmail,
    setVerifyOtp,
}: {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setVerifyOtp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { mutateAsync: resetPassword, isPending } = useResetPassword();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ResetPasswordFormValues>({
        resolver: yupResolver(resetPasswordFormSchema),
        defaultValues: {
            email,
        },
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        try {
            const response = await resetPassword(data);
            setEmail(data.email);
            setVerifyOtp(true);
            toast.success(
                response?.message ||
                    "If an account exists, an OTP has been sent to your email",
            );
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to request password reset OTP",
            );
        }
    };

    return (
        <ResetPasswordContainer>
            <Typography variant="h5" className="heading">
                Reset Password
            </Typography>

            <Box
                component="form"
                className="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <EmailField
                            {...field}
                            label="Email"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    className="submitButton"
                    disabled={isSubmitting || isPending}
                >
                    Reset Password
                </Button>
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
}));
