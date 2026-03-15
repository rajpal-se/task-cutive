import { Box, Button, styled, Typography } from "@mui/material";
import { EmailField } from "../../components/styled/email-field";

export default function ResetPasswordUi({
    setVerifyOtp,
}: {
    setVerifyOtp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const handleResetPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setVerifyOtp(true);
    };

    return (
        <ResetPasswordContainer>
            <Typography variant="h5" className="heading">
                Reset Password
            </Typography>
            <Box className="form">
                <EmailField label="Email" />
                <Button
                    variant="contained"
                    className="submitButton"
                    onClick={handleResetPassword}
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
