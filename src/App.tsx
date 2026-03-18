import { Outlet } from "react-router";
import classses from "./app.module.scss";
import Header from "./components/header";
import { useRoutes } from "./router/routes";
import { isAppLoadingSelector } from "./store";
import { AppLoader } from "./components/app-loader";
import { useSelector } from "react-redux";

export default function App() {
    const { isPublicRoute } = useRoutes();
    const isAppLoading = useSelector(isAppLoadingSelector);

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
