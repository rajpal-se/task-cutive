import { Box, Button, Typography, Divider, styled } from "@mui/material";
import AuthLayout from "../../components/auth-layout";
import { EmailField } from "../../components/styled/email-field";
import { PasswordField } from "../../components/styled/password-field";
import { useNavigate } from "react-router";
import { TextField } from "../../components/styled/text-field";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupFormSchema, type SignupFormValues } from "../../schemas";

export default function Signup() {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignupFormValues>({
        resolver: yupResolver(signupFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    const handleLogin = () => {
        navigate("/login");
    };

    const onSubmit = async (data: SignupFormValues) => {
        console.log("signup payload", data);
    };

    return (
        <AuthLayout>
            <SignupContainer>
                <Typography variant="h5" className="heading">
                    Signup
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <Box className="form">
                        <Box className="nameRow">
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label="First Name"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label="Last Name"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Box>
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
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <PasswordField
                                    {...field}
                                    label="Password"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            style={{
                                alignSelf: "center",
                                margin: "4px 0px",
                            }}
                        >
                            Signup
                        </Button>

                        <Divider className="divider" />
                        <Box className="loginRow">
                            Already have an account?
                            <Button
                                type="button"
                                variant="text"
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </SignupContainer>
        </AuthLayout>
    );
}

const SignupContainer = styled(Box)(({ theme }) => ({
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
    ".nameRow": {
        display: "flex",
        flexDirection: "row",
        gap: theme.spacing(2),
    },
    ".loginRow": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing(2),
        alignSelf: "center",
    },

    ".divider": {
        width: "80%",
    },
}));
