import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
	name: "document",
	initialState: {
		listDocuments: [],
	},
	reducers: {
		setDocuments(state, action) {
			return { ...state, listDocuments: [...action.payload] };
		},
	},
});

export const { setDocuments } = documentSlice.actions;
export const documentReducer = documentSlice.reducer;
