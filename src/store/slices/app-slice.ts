import {
    createSelector,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { RTK } from "../constants";
import type { RootState } from "..";

export const appSlice = createSlice({
    name: RTK.sliceName.app,
    initialState: {
        isAppLoading: true,
    },
    reducers: {
        setIsAppLoading(state, action: PayloadAction<boolean>) {
            state.isAppLoading = action.payload;
        },
    },
});

export const { setIsAppLoading } = appSlice.actions;

export const isAppLoadingSelector = createSelector(
    (state: RootState) => state.app.isAppLoading,
    (isAppLoading) => isAppLoading,
);
