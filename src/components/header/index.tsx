import { styled } from "@mui/material";
import { config } from "../../config";
import AppAutoContainer from "../app-auto-container";

export default function Header() {
    return (
        <HeaderContainer>
            <AppAutoContainer>{config.appName}</AppAutoContainer>
        </HeaderContainer>
    );
}

const HeaderContainer = styled("header")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "60px",
    margin: "0 auto",
}));
