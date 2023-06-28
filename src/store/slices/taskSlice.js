import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks(state, action) {
<<<<<<< HEAD
        state = [...action.payload];
=======
        state.tasks = action.payload;
>>>>>>> 258bf79 (create task board component)
      },
  },
});

export const { setTasks } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
