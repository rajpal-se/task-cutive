import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RTK } from "../constants";
import { type RootState } from "..";
import type { UserData } from "../../types";

const initialState = null as UserData | null;

export const userSlice = createSlice({
    name: RTK.sliceName.user,
    initialState,
    reducers: {
        setUserData(_state, action: PayloadAction<UserData | null>) {
            return action.payload;
        },
    },
});

export const { setUserData } = userSlice.actions;

export const userDataSelector = (state: RootState) => state.user;
