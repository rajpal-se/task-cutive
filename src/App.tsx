import { Outlet } from "react-router";
import classses from "./app.module.scss";
import Header from "./components/header";

export default function App() {
    return (
        <div className={classses.root}>
            <Header />
            <Outlet />
        </div>
    );
}
