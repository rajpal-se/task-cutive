import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#8a2be2",
            contrastText: "#fff",
        },
        secondary: {
            main: "#00a800",
            contrastText: "#fff",
        },
        background: {
            default: "#f5f5f5",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontFamily: '"Dancing Script", "Cursive"',
        },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                color: "primary",
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    textTransform: "none",
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;
