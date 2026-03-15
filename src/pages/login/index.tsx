import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Divider,
    styled,
} from "@mui/material";
import AuthLayout from "../../components/auth-layout";
import { EmailField } from "../../components/styled/email-field";
import { PasswordField } from "../../components/styled/password-field";

export default function Login() {
    return (
        <AuthLayout>
            <LoginContainer>
                <Typography variant="h5" className="heading">
                    Login
                </Typography>

                <Box>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <EmailField />
                        <PasswordField />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                bgcolor: "#8e24aa",
                                "&:hover": { bgcolor: "#7b1fa2" },
                                textTransform: "none",
                                fontSize: "1.1rem",
                            }}
                        >
                            Login
                        </Button>

                        <Link
                            href="#"
                            variant="body2"
                            sx={{ color: "#3f51b5", textDecoration: "none" }}
                        >
                            Forgot Password?
                        </Link>

                        <Divider sx={{ my: 3 }} />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: "#00a800",
                                "&:hover": { bgcolor: "#008a00" },
                                textTransform: "none",
                                fontWeight: "bold",
                                py: 1.5,
                            }}
                        >
                            Create New Account
                        </Button>
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
}));
