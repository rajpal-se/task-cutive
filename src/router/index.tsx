import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import App from "../app";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ResetPassword from "../pages/reset-password";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: Home,
            },
        ],
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/signup",
        Component: Signup,
    },
    {
        path: "/reset-password",
        Component: ResetPassword,
    },
]);

export default router;
