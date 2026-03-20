import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import App from "../App";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ResetPassword from "../pages/reset-password";
import VerifyEmail from "../pages/verify-email";
import Profile from "../pages/profile";
import TaskEditorPage from "../pages/task-editor";
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
            // Public Routes
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
            {
                path: routes.verifyEmail,
                Component: VerifyEmail,
            },
            {
                path: routes.profile,
                Component: Profile,
            },
            {
                path: routes.new,
                Component: TaskEditorPage,
            },
            {
                path: routes.editTaskPattern,
                Component: TaskEditorPage,
            },
        ],
    },
]);

export default router;
