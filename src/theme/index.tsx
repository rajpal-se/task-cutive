import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#8a2be2", // Brand Purple
            contrastText: "#fff",
        },
        secondary: {
            main: "#00a800", // Brand Green
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
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    height: 48, // Industry standard height
                    borderRadius: 8,
                    backgroundColor: "#fff",
                },
                input: {
                    padding: "12px 14px",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    // Centers the label vertically in the 48px box
                    transform: "translate(14px, 12px) scale(1)",
                    "&.MuiInputLabel-shrink": {
                        transform: "translate(14px, -9px) scale(0.75)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 48, // Matching button height for symmetry
                    borderRadius: 4,
                    textTransform: "none",
                    fontWeight: 600,
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: ({ theme: muiTheme }) => ({
                    color: muiTheme.palette.primary.main,
                    "& .MuiSvgIcon-root": {
                        fontSize: "1.25rem",
                    },
                }),
            },
        },
    },
});

export default theme;
