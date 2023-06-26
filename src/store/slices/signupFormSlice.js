import { createSlice } from "@reduxjs/toolkit";

const signupFormSlice = createSlice({
  name: "signupForm",
  initialState: {
    email: "",
    username: "",
    password: "",
    bio: "",
    pic: null,
  },
  reducers: {
    changeEmail(state, action) {
      state.email = action.payload;
    },
    changeUsername(state, action) {
      state.username = action.payload;
    },
    changePassword(state, action) {
      state.password = action.payload;
    },
    changeBio(state, action) {
      state.bio = action.payload;
    },
    changePic(state, action) {
      state.pic = action.payload;
    },
  },
});

export const {
  changeEmail,
  changeUsername,
  changePassword,
  changeBio,
  changePic,
} = signupFormSlice.actions;
export const signupFormReducer = signupFormSlice.reducer;
