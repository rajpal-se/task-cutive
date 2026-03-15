import { Box, Paper, styled } from "@mui/material";
import { config } from "../../config";
import AppAutoContainer from "../app-auto-container";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleLogoClick = () => {
        if (pathname !== "/") {
            navigate("/");
        }
    };

    return (
        <HeaderRoot>
            <AppAutoContainer>
                <HeaderContainer>
                    <Box className="logo" onClick={handleLogoClick}>
                        {config.appName}
                    </Box>
                </HeaderContainer>
            </AppAutoContainer>
        </HeaderRoot>
    );
}

const HeaderRoot = styled("header")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "60px",
    margin: "0 auto",
    display: "flex",
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0px 16px",

    ".logo": {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
        fontSize: "1.5rem",
        fontFamily: "cursive",
        fontWeight: 500,
        // border: "1px solid red",
        color: theme.palette.common.white,
        borderRadius: "8px",
        cursor: "pointer",
    },
}));
