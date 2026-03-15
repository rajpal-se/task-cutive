import { Box, Button, Typography, Divider, styled } from "@mui/material";
import AuthLayout from "../../components/auth-layout";
import { EmailField } from "../../components/styled/email-field";
import { PasswordField } from "../../components/styled/password-field";
import { useNavigate } from "react-router";
import { TextField } from "../../components/styled/text-field";

export default function Signup() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <AuthLayout>
            <SignupContainer>
                <Typography variant="h5" className="heading">
                    Signup
                </Typography>

                <Box>
                    <Box className="form">
                        <Box className="nameRow">
                            <TextField label="First Name" />
                            <TextField label="Last Name" />
                        </Box>
                        <EmailField label="Email" />
                        <PasswordField label="Password" />
                        <Button
                            type="submit"
                            variant="contained"
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
