import { createSlice } from "@reduxjs/toolkit";

interface State {
	username: string;
}

type UserState = State | null;

export const user = createSlice({ name: "user", reducers: {}, initialState: null as UserState });
