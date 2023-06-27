import { createSlice } from "@reduxjs/toolkit";

const localStorageTeamKey = "team";
function decodeValue(key) {
  if (localStorage.getItem(localStorageTeamKey)) {
    return JSON.parse(localStorage.getItem(localStorageTeamKey))[key];
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
        localStorageTeamKey,
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
