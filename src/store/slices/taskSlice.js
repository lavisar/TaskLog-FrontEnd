import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks(state, action) {
      state = [...state,...action.payload];
      console.log("IS HERE", state);
      },
  },
});

export const { setTasks } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
