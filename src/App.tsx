import { Outlet } from "react-router";
import classses from "./app.module.scss";
import Header from "./components/header";
import { useRoutes } from "./router/routes";
import { isAppLoadingSelector, setIsAppLoading } from "./store";
import { AppLoader } from "./components/app-loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccessToken } from "./helper";

export default function App() {
    const { isPublicRoute } = useRoutes();
    const isAppLoading = useSelector(isAppLoadingSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const login = async () => {
            const accessToken = await getAccessToken();
            // console.log("Access Token:", accessToken);
            dispatch(setIsAppLoading(false));
        };
        login();
    }, [dispatch]);

    if (isAppLoading) {
        return <AppLoader />;
    }

    return (
        <div className={classses.root}>
            {!isPublicRoute && <Header />}
            <Outlet />
        </div>
    );
}
