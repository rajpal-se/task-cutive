import { Box, Button, Typography, Divider, styled } from "@mui/material";
import AuthLayout from "../../components/auth-layout";
import { EmailField } from "../../components/styled/email-field";
import { PasswordField } from "../../components/styled/password-field";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema, type LoginFormValues } from "../../schemas";
import { useLogin } from "../../apis";
import { LS } from "../../constants";
import { toast } from "sonner";
import routes from "../../router/routes";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store";

export default function Login() {
    const navigate = useNavigate();
    const { mutateAsync: login, isPending } = useLogin();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSignup = () => {
        navigate(routes.signup);
    };

    const handleForgotPassword = () => {
        navigate(routes.resetPassword);
    };

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await login(data);
            const { success, data: resData = {} } = response;

            const accessToken = resData?.accessToken;
            const refreshToken = resData?.refreshToken;

            if (accessToken) {
                localStorage.setItem(LS.ACCESS_TOKEN, accessToken);
            }

            if (refreshToken) {
                localStorage.setItem(LS.REFRESH_TOKEN, refreshToken);
            }

            if (success === false) {
                navigate(routes.verifyEmail, {
                    state: { email: data.email, loginFlow: true },
                });
                toast.success("Login Successful. Please verify your email.");
                return;
            }

            const userData = resData?.user;
            // console.log("User Data from Login Response:", userData, response);
            if (userData) {
                dispatch(setUserData(userData));
            }

            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Login failed",
            );
        }
    };

    return (
        <AuthLayout>
            <LoginContainer>
                <Typography variant="h5" className="heading">
                    Login
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <Box sx={{ mt: 1 }} gap={2}>
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
                                disabled={isSubmitting || isPending}
                                style={{
                                    alignSelf: "center",
                                    margin: "4px 0px",
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                        <Box className="formBottom">
                            <Button
                                type="button"
                                variant="text"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </Button>
                            <Divider className="divider" />
                            <Button
                                type="button"
                                variant="outlined"
                                color="secondary"
                                onClick={handleSignup}
                            >
                                Create New Account
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </LoginContainer>
        </AuthLayout>
    );
}

const LoginContainer = styled(Box)(({ theme }) => ({
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
