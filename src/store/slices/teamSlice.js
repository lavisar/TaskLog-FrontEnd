import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../constants/LocalStorageKeys";

const teamKey = LOCAL_STORAGE_KEYS.TEAM;
function decodeValue(key) {
  if (localStorage.getItem(teamKey)) {
    return JSON.parse(localStorage.getItem(teamKey))[key];
  }
  return null;
}

const teamSlice = createSlice({
  name: "team",
  initialState: {
    id: decodeValue("id"),
    teamName: decodeValue("teamName"),
    description: decodeValue("description"),
    createdAt: decodeValue("createdAt"),
  },
  reducers: {
    setTeam: (state, action) => {
      const { id, teamName, description, createdAt } = action.payload;
      localStorage.setItem(
        teamKey,
        JSON.stringify({ id, teamName, description, createdAt })
      );
      state.id = id;
      state.teamName = teamName;
      state.description = description;
      state.createdAt = createdAt;
    },
  },
});

export const { setTeam } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
