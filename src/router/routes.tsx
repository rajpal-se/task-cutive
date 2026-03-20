import { useLocation } from "react-router";

const routes = {
    home: "/",
    login: "/login",
    signup: "/signup",
    resetPassword: "/reset-password",
    verifyEmail: "/verify-email",
    profile: "/profile",
    new: "/new",
    editTaskPattern: "/new/:taskId",
    editTask: (taskId: string) => `/new/${taskId}`,
};

export default routes;

export const useRoutes = () => {
    const { pathname } = useLocation();

    const isPublicRoute = [
        routes.login,
        routes.signup,
        routes.resetPassword,
        routes.verifyEmail,
    ].includes(pathname);

    return {
        isPublicRoute,
        pathname,
    };
};
