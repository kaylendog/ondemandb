import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum DatabaseCreationState {
	NONE,
	AUTHORIZING,
	CREATING,
}

export enum DatabaseType {
	POSTGRESQL,
	MARIADB,
}
interface State {
	databaseType?: DatabaseType;
	creationState: DatabaseCreationState;
}

export const database = createSlice({
	name: "database",
	reducers: {
		setCreationState: (state, action: PayloadAction<DatabaseCreationState>) => {
			state.creationState = action.payload;
		},
	},
	initialState: { creationState: DatabaseCreationState.NONE } as State,
});

export const { setCreationState } = database.actions;
