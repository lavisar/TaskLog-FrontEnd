import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../constants/LocalStorageKeys";

const currentMemberKey = LOCAL_STORAGE_KEYS.CURRENT_MEMBER;
function decodeValue(key) {
  if (localStorage.getItem(currentMemberKey)) {
    return JSON.parse(localStorage.getItem(currentMemberKey))[key];
  }
  return null;
}
const currentMemberSlice = createSlice({
  name: "currentMember",
  initialState: {
    teamMemberId: decodeValue("teamMemberId"),
    teamId: decodeValue("teamId"),
    addedBy: decodeValue("addedBy"),
    teamMemberRole: decodeValue("teamMemberRole"),
    addedAt: decodeValue("addedAt"),
    userId: decodeValue("userId"),
    email: decodeValue("email"),
    username: decodeValue("username"),
    pic: decodeValue("pic"),
  },
  reducers: {
    setCurrentMember: (state, action) => {
      const {
        teamMemberId,
        teamId,
        addedBy,
        teamMemberRole,
        addedAt,
        userId,
        email,
        username,
        pic,
      } = action.payload;
      localStorage.setItem(
        currentMemberKey,
        JSON.stringify({
          teamMemberId,
          teamId,
          addedBy,
          teamMemberRole,
          addedAt,
          userId,
          email,
          username,
          pic,
        })
      );
      state.teamMemberId = teamMemberId;
      state.teamId = teamId;
      state.addedBy = addedBy;
      state.teamMemberRole = teamMemberRole;
      state.addedAt = addedAt;
      state.userId = userId;
      state.email = email;
      state.username = username;
      state.pic = pic;
    },
    clearCurrentMember: (state, action) => {
      localStorage.removeItem(currentMemberKey);
      state.teamMemberId = null;
      state.teamId = null;
      state.addedBy = null;
      state.teamMemberRole = null;
      state.addedAt = null;
      state.userId = null;
      state.email = null;
      state.username = null;
      state.pic = null;
    },
  },
});

export const { setCurrentMember, clearCurrentMember } =
  currentMemberSlice.actions;
export const currentMemberReducer = currentMemberSlice.reducer;
