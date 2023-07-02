import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../../constants/LocalStorageKeys";

const localStorageKey = "TaskLogCredentials";
function decodeValue(key) {
  if (localStorage.getItem(localStorageKey)) {
    return JSON.parse(localStorage.getItem(localStorageKey))[key];
  }
  return null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: decodeValue("user"),
    roles: decodeValue("roles"),
    token: decodeValue("token"),
    refreshToken: decodeValue("refreshToken"),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, roles, token, refreshToken } = action.payload;
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ user, roles, token, refreshToken })
      );
      state.user = user;
      state.roles = roles;
      state.token = token;
      state.refreshToken = refreshToken;
    },
    logOut: (state, action) => {
      // remove all local storage upone logging out
      localStorage.removeItem(localStorageKey);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TEAM);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_MEMBER);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
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
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken;
