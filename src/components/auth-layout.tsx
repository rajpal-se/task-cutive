import { Avatar, Box, Divider, Paper, styled, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

export default function AuthLayout(props: PropsWithChildren) {
    return (
        <AuthLayoutRoot>
            <Paper elevation={3}>
                <Avatar
                    className="logo"
                    src="/favicon/logo-transparent-192x192.png"
                />
                <Typography className="text" variant="h4">
                    Task Cutive
                </Typography>
                <Divider className="divider" />

                {props.children}
            </Paper>
        </AuthLayoutRoot>
    );
}

const AuthLayoutRoot = styled(Box)(({ theme }) => ({
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    ">.MuiPaper-root": {
        padding: 4,
        width: "100%",
        maxWidth: 400,
        textAlign: "center",
        borderRadius: 20,

        ".logo": {
            width: 80,
            height: 80,
            padding: 12,
            margin: "-45px auto 20px",
            backgroundColor: "white",
            borderRadius: "50%",
            border: `3px solid ${theme.palette.primary.main}`,
        },
        ".text": {
            fontFamily: "cursive",
            color: theme.palette.primary.main,
            fontWeight: "bold",
        },
        ".divider": {
            margin: "12px auto",
            width: "40%",
            borderBottomWidth: 2,
            borderColor: theme.palette.primary.main,
        },
    },
}));
