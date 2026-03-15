import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import App from "../app";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ResetPassword from "../pages/reset-password";
import routes from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: routes.home,
                Component: Home,
            },
        ],
    },
    {
        path: routes.login,
        Component: Login,
    },
    {
        path: routes.signup,
        Component: Signup,
    },
    {
        path: routes.resetPassword,
        Component: ResetPassword,
    },
]);

export default router;
