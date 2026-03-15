import { createBrowserRouter } from "react-router";
import Home from "../pages/signup";
import App from "../app";
import Login from "../pages/login";
import Signup from "../pages/home";

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
