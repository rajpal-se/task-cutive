import {
    createSelector,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { RTK } from "../constants";
import { type RootState } from "..";
import type { UserData } from "../../types";

const initialState: { data: UserData | null } = {
    data: null,
};

export const userSlice = createSlice({
    name: RTK.sliceName.user,
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData | null>) {
            state.data = action.payload;
        },
    },
});

export const { setUserData } = userSlice.actions;

export const userDataSelector = createSelector(
    (state: RootState) => state.user.data,
    (data) => data,
);
