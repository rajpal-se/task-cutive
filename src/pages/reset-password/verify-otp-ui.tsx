import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function VerifyOtpUi() {
    const navigate = useNavigate();

    const handleVerifyOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/login", { replace: true });
    };

    return (
        <ResetPasswordContainer>
            <Typography variant="h5" className="heading">
                Verify OTP
            </Typography>
            <Box className="form">
                <TextField label="OTP" required />
                <Button
                    type="submit"
                    variant="contained"
                    className="submitButton"
                    onClick={handleVerifyOtp}
                >
                    Verify OTP
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
