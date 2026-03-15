import { Link } from "react-router";
import routes from "../../router/routes";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import AppAutoContainer from "../../components/app-auto-container";

export default function Home() {
    return (
        <HomeContainer>
            <AppAutoContainer>
                <div>
                    Body
                    <hr />
                    <Link to={routes.home}>Home</Link>
                    <Link to={routes.login}>Login</Link>
                    <Link to={routes.signup}>Signup</Link>
                </div>
            </AppAutoContainer>
        </HomeContainer>
    );
}

const HomeContainer = styled(Box)(() => ({
    // padding: "16px",
}));
