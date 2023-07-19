import { createSlice } from "@reduxjs/toolkit";

const submitSlice = createSlice({
	name: "submit",
	initialState: {
		listSubmits: [],
	},
	reducers: {
		setSubmits(state, action) {
			return { ...state, listSubmits: [...action.payload] };
		},
	},
});

export const { setSubmits } = submitSlice.actions;
export const submitReducer = submitSlice.reducer;
