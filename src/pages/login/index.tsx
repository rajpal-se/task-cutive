import { Box, Button, Typography, Divider, styled } from "@mui/material";
import AuthLayout from "../../components/auth-layout";
import { EmailField } from "../../components/styled/email-field";
import { PasswordField } from "../../components/styled/password-field";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleForgotPassword = () => {
        navigate("/reset-password");
    };

    return (
        <AuthLayout>
            <LoginContainer>
                <Typography variant="h5" className="heading">
                    Login
                </Typography>

                <Box>
                    <Box sx={{ mt: 1 }} gap={2}>
                        <Box className="formTop">
                            <EmailField label="Email" />
                            <PasswordField label="Password" />
                            <Button
                                variant="contained"
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
