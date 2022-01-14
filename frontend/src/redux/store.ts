import { configureStore } from "@reduxjs/toolkit";

import { database } from "./slices/database";
import { user } from "./slices/user";

export const store = configureStore({
	reducer: {
		database: database.reducer,
		user: user.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
