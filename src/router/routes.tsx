import { useLocation } from "react-router";

const routes = {
    home: "/",
    login: "/login",
    signup: "/signup",
    resetPassword: "/reset-password",
    profile: "/profile",
    new: "/new",
};

export default routes;

export const useRoutes = () => {
    const { pathname } = useLocation();

    const isPublicRoute = [
        routes.login,
        routes.signup,
        routes.resetPassword,
    ].includes(pathname);

    return {
        isPublicRoute,
        pathname,
    };
};
