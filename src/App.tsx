import { Link } from "react-router";
import classses from "./app.module.scss";

export default function App() {
    return (
        <div className={classses.root}>
            <div>Header</div>
            <div>
                Body
                <hr />
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
}
