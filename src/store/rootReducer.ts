import { appSlice } from "./slices";
import { userSlice } from "./slices";

const rootReducer = {
    app: appSlice.reducer,
    user: userSlice.reducer,
};

export default rootReducer;
