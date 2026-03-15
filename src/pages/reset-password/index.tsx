import { Box, Button, Divider, styled } from "@mui/material";
import AuthLayout from "../../components/auth-layout";
import { useNavigate } from "react-router";
import ResetPasswordUi from "./reset-ui";
import { useState } from "react";
import VerifyOtpUi from "./verify-otp-ui";

export default function ResetPassword() {
    const [verifyOtp, setVerifyOtp] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login", { replace: true });
    };

    return (
        <AuthLayout>
            <ResetPasswordContainer>
                {verifyOtp ? (
                    <VerifyOtpUi />
                ) : (
                    <ResetPasswordUi setVerifyOtp={setVerifyOtp} />
                )}
                <Box className="formBottom">
                    <Divider className="divider" />
                    <Button type="button" variant="text" onClick={handleLogin}>
                        Go Back
                    </Button>
                </Box>
            </ResetPasswordContainer>
        </AuthLayout>
    );
}

const ResetPasswordContainer = styled(Box)(({ theme }) => ({
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
