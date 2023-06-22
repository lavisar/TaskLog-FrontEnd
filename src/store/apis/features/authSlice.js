import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, roles: null, token: null, refreshToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, roles, token, refreshToken } = action.payload;
      state.user = user;
      state.roles = roles;
      state.token = token;
      state.refreshToken = refreshToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.roles = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentRoles = (state) => state.auth.roles;
export const selectCurrentToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refreshToken;
