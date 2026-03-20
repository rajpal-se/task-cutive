import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, Typography, styled } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useVerifyEmail } from "../../apis";
import AuthLayout from "../../components/auth-layout";
import { EmailField } from "../../components/styled/email-field";
import { TextField } from "../../components/styled/text-field";
import { LS } from "../../constants";
import {
    type VerifyEmailFormValues,
    verifyEmailFormSchema,
} from "../../schemas";
import routes from "../../router/routes";
import { useCallback, useEffect } from "react";

// type VerifyEmailLocationState = {
//     email: string;
//     loginFlow: boolean;
// };

export default function VerifyEmail() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const { mutateAsync: verifyEmail, isPending } = useVerifyEmail();

    const handleBack = useCallback(() => {
        navigate(routes.login, { replace: true });
    }, [navigate]);

    useEffect(() => {
        const { email, loginFlow } = state ?? {};
        if (!loginFlow || !email) {
            handleBack();
        }
    }, [handleBack, state]);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<VerifyEmailFormValues>({
        resolver: yupResolver(verifyEmailFormSchema),
        defaultValues: {
            email: state?.email ?? "",
            otp: "",
        },
    });

    const onSubmit = async (data: VerifyEmailFormValues) => {
        try {
            const response = await verifyEmail(data);

            if (response?.accessToken) {
                localStorage.setItem(LS.ACCESS_TOKEN, response.accessToken);
            }

            if (response?.refreshToken) {
                localStorage.setItem(LS.REFRESH_TOKEN, response.refreshToken);
            }

            toast.success(response?.message || "Email verified successfully");
            navigate(routes.home, { replace: true });
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Verification failed",
            );
        }
    };

    return (
        <AuthLayout>
            <VerifyEmailContainer>
                <Typography variant="h5" className="heading">
                    Verify Email
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <Box className="formTop">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <EmailField
                                    {...field}
                                    label="Email"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    disabled
                                />
                            )}
                        />

                        <Controller
                            name="otp"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Verification OTP"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting || isPending}
                            className="submitButton"
                        >
                            Verify Email
                        </Button>
                    </Box>

                    <Box className="formBottom">
                        <Divider className="divider" />
                        <Button
                            type="button"
                            variant="text"
                            onClick={handleBack}
                        >
                            Go Back To Login
                        </Button>
                    </Box>
                </Box>
            </VerifyEmailContainer>
        </AuthLayout>
    );
}

const VerifyEmailContainer = styled(Box)(({ theme }) => ({
    ".heading": {
        color: theme.palette.primary.main,
        mb: 3,
        fontWeight: 500,
    },
    ".formTop": {
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
    ".formBottom": {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(2),
        padding: theme.spacing(2),
    },
    ".divider": {
        width: "100%",
    },
}));
