import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../../firebase";
import { store } from "../store";

interface State {
	loggedIn: boolean;
	uid: string;
}

export const login = createAsyncThunk("user/login", async () => {
	const { user } = await signInAnonymously(auth);
	return user.uid;
});

export const logout = createAsyncThunk("user/logout", async () => {
	await auth.signOut();
});

onAuthStateChanged(auth, newUser => {
	if (newUser) {
		store.dispatch(user.actions.login(newUser.uid));
	} else {
		store.dispatch(user.actions.logout());
	}
});

export const user = createSlice({
	name: "user",
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			state.loggedIn = true;
			state.uid = action.payload;
		},
		logout: state => {
			state.loggedIn = false;
			state.uid = "";
		},
	},
	initialState: { loggedIn: false, uid: "" } as State,
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
			state.loggedIn = true;
			state.uid = action.payload;
		});
		builder.addCase(logout.fulfilled, state => {
			state.loggedIn = false;
			state.uid = "";
		});
	},
});
