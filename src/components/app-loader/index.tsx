import { Box, styled } from "@mui/material";

export function AppLoader() {
    return (
        <AppLoaderContainer>
            <img src="/favicon/logo-transparent-192x192.png" />
            <div className="loader"></div>
        </AppLoaderContainer>
    );
}

const AppLoaderContainer = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    gap: "20px",

    img: {
        height: "80px",
        width: "80px",

        animation: "bounce 2s infinite",

        "@keyframes bounce": {
            "0%, 100%": {
                transform: "translateY(0)",
            },
            "50%": {
                transform: "translateY(-20px)",
            },
        },
    },

    ".loader": {
        width: "50px",
        height: "50px",
        border: `5px solid ${theme.palette.primary.main}`,
        borderRadius: "50%",
        borderTopColor: "transparent",
        animation: "spin 1s linear infinite",
        "@keyframes spin": {
            "0%": {
                transform: "rotate(0deg)",
            },
            "100%": {
                transform: "rotate(360deg)",
            },
        },
    },
}));
