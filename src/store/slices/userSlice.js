import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../constants/LocalStorageKeys";

const userKey = LOCAL_STORAGE_KEYS.USER;
function decodeValue(key) {
  if (localStorage.getItem(userKey)) {
    return JSON.parse(localStorage.getItem(userKey))[key];
  }
  return null;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: decodeValue("id"),
    email: decodeValue("email"),
    username: decodeValue("username"),
    role: decodeValue("role"),
    bio: decodeValue("bio"),
    pic: decodeValue("pic"),
    createdAt: decodeValue("createdAt"),
  },
  reducers: {
    setUser: (state, action) => {
      const { id, email, username, role, bio, pic, createdAt } = action.payload;
      localStorage.setItem(
        userKey,
        JSON.stringify({ id, email, username, role, bio, pic, createdAt })
      );
      state.id = id;
      state.email = email;
      state.username = username;
      state.role = role;
      state.bio = bio;
      state.pic = pic;
      state.createdAt = createdAt;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
