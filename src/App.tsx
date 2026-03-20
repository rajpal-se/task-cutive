import { Outlet, useNavigate } from "react-router";
import classses from "./app.module.scss";
import Header from "./components/header";
import routes, { useRoutes } from "./router/routes";
import {
    isAppLoadingSelector,
    setIsAppLoading,
    userDataSelector,
} from "./store";
import { AppLoader } from "./components/app-loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccessToken, getUserProfile } from "./helper";

export default function App() {
    const { isPublicRoute } = useRoutes();
    const isAppLoading = useSelector(isAppLoadingSelector);
    const userData = useSelector(userDataSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const login = async () => {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                navigate(routes.login);
                dispatch(setIsAppLoading(false));
            }
            await getUserProfile();
            dispatch(setIsAppLoading(false));
        };
        login();
    }, [dispatch, navigate]);

    if (isAppLoading) {
        return <AppLoader />;
    }

    return (
        <div className={classses.root}>
            {!isPublicRoute && Boolean(userData) && <Header />}
            <Outlet />
        </div>
    );
}
