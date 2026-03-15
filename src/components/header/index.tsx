import { Box, styled } from "@mui/material";
import { config } from "../../config";
import AppAutoContainer from "../app-auto-container";
import { useLocation, useNavigate } from "react-router";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

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
                        <Box>{config.appName}</Box>
                    </Box>
                    <Box className="add">
                        <AddCircleOutlineIcon />
                    </Box>
                    <Box className="actions">
                        <AccountCircleOutlinedIcon />
                        <LogoutOutlinedIcon />
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
    userSelect: "none",

    ">div": {
        display: "flex",
        alignItems: "center",
        flex: 1,
        color: theme.palette.common.white,

        svg: {
            cursor: "pointer",
            fontSize: "2rem",
            padding: "2px",
            borderRadius: "8px",
            transition: "background-color 0.3s ease",
            position: "relative",

            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            },

            "&:active": {
                backgroundColor: theme.palette.primary.dark,
                opacity: 0.9,
                top: "1px",
            },
        },
    },

    ".logo": {
        div: {
            flexShrink: 0,
            padding: theme.spacing(1),
            fontSize: "1.5rem",
            fontFamily: "cursive",
            fontWeight: 500,
            color: theme.palette.common.white,
            borderRadius: "8px",
            cursor: "pointer",
        },
    },
    ".add": {
        justifyContent: "center",
        svg: {
            fontSize: "2.5rem",
        },
    },
    ".actions": {
        justifyContent: "flex-end",
        gap: theme.spacing(3),
    },
}));
