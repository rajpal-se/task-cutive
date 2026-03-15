import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import App from "../app";
import Login from "../pages/login";
import Signup from "../pages/signup";

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
]);

export default router;
