import { Box, Button, Typography, Divider, styled } from "@mui/material";
import AuthLayout from "../../components/auth-layout";
import { EmailField } from "../../components/styled/email-field";
import { useNavigate } from "react-router";

export default function ResetPassword() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <AuthLayout>
            <ResetPasswordContainer>
                <Typography variant="h5" className="heading">
                    Reset Password
                </Typography>

                <Box>
                    <Box component="form" noValidate sx={{ mt: 1 }} gap={2}>
                        <Box className="formTop">
                            <EmailField label="Email" />
                            <Button
                                type="submit"
                                variant="contained"
                                style={{
                                    alignSelf: "center",
                                    margin: "4px 0px",
                                }}
                            >
                                Reset Password
                            </Button>
                        </Box>
                        <Box className="formBottom">
                            <Divider className="divider" />
                            <Button
                                type="button"
                                variant="text"
                                onClick={handleLogin}
                            >
                                Go Back
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </ResetPasswordContainer>
        </AuthLayout>
    );
}

const ResetPasswordContainer = styled(Box)(({ theme }) => ({
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
