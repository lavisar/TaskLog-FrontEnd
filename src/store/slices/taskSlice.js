import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
	name: "tasks",
	initialState: {
		listTasks: [],
		taskToShowDetails: {},
	},
	reducers: {
		setTasks(state, action) {
			return { ...state, listTasks: [...action.payload] };
		},
		setShowTaskDetails(state, action) {
			return { ...state, taskToShowDetails: { ...action.payload } };
		},
	},
});

export const { setTasks, setShowTaskDetails } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
