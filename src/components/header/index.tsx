import { Box, styled } from "@mui/material";
import { config } from "../../config";
import AppAutoContainer from "../app-auto-container";
import { useLocation, useNavigate } from "react-router";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import routes from "../../router/routes";
import { useLogout } from "../../apis";
import { toast } from "sonner";
import { setUserData } from "../../store";
import { useDispatch } from "react-redux";
import { ConfirmDialog } from "../styled/confirm-dialog";
import { useState } from "react";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const { mutateAsync: logout, isPending: isLogoutPending } = useLogout();

    const handleLogoClick = () => {
        if (pathname !== routes.home) {
            navigate(routes.home);
        }
    };

    const handleProfileClick = () => {
        if (pathname !== routes.profile) {
            navigate(routes.profile);
        }
    };

    const handleAddTaskClick = () => {
        if (pathname !== routes.new) {
            navigate(routes.new);
        }
    };

    const handleLogoutClick = () => {
        setIsLogoutDialogOpen(true);
    };

    const handleCloseLogoutDialog = () => {
        if (!isLogoutPending) {
            setIsLogoutDialogOpen(false);
        }
    };

    const handleConfirmLogout = async () => {
        setIsLogoutDialogOpen(false);

        try {
            await logout();
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Logout failed",
            );
        } finally {
            localStorage.clear();
            dispatch(setUserData(null));
            navigate(routes.login);
        }
    };

    return (
        <>
            <HeaderRoot>
                <AppAutoContainer>
                    <HeaderContainer>
                        <Box className="logo" onClick={handleLogoClick}>
                            <Box>{config.appName}</Box>
                        </Box>
                        <Box className="add">
                            <AddCircleOutlineIcon
                                onClick={handleAddTaskClick}
                            />
                        </Box>
                        <Box className="actions">
                            <AccountCircleOutlinedIcon
                                onClick={handleProfileClick}
                            />
                            <LogoutOutlinedIcon onClick={handleLogoutClick} />
                        </Box>
                    </HeaderContainer>
                </AppAutoContainer>
            </HeaderRoot>

            <ConfirmDialog
                open={isLogoutDialogOpen}
                title="Confirm Logout"
                message="You are about to sign out from Task Cutive. Do you want to continue?"
                confirmText="Logout"
                cancelText="Stay Logged In"
                loading={isLogoutPending}
                onConfirm={handleConfirmLogout}
                onClose={handleCloseLogoutDialog}
            />
        </>
    );
}

const HeaderRoot = styled("header")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "60px",
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
