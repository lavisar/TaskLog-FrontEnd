import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks(state, action) {
        state = [...action.payload];
      },
  },
});

export const { setTasks } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
