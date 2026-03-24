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
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root input": {
                        padding: "9px 14px",
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    "& .MuiPickersInputBase-root": {
                        paddingLeft: 0,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    backgroundColor: "#fff",
                },
                input: {
                    fontSize: "0.95rem",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    transform: "translate(14px, 12px) scale(1)",
                    fontSize: "0.9rem",
                    "&.MuiInputLabel-shrink": {
                        transform: "translate(14px, -8px) scale(0.75)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 42,
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "6px 22px",
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: ({ theme: muiTheme }) => ({
                    color: muiTheme.palette.primary.main,
                    "& .MuiSvgIcon-root": {
                        fontSize: "1.1rem",
                    },
                }),
            },
        },
    },
});

export default theme;
