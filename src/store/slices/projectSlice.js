import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../constants/LocalStorageKeys";

const teamKey = LOCAL_STORAGE_KEYS.PROJECT;
function decodeValue(key) {
  if (localStorage.getItem(teamKey)) {
    return JSON.parse(localStorage.getItem(teamKey))[key];
  }
  return null;
}

const projectSlice = createSlice({
    name: "project",
    initialState: {
        id: decodeValue("id"),
        name: decodeValue("name"),
        team_id: decodeValue("team_id"),
        createAt: decodeValue("createAt"),
    },
    reducers: {
        setProject: (state, action) =>{
            const { id,name,team_id,createAt} = action.payload;
            localStorage.setItem(
                teamKey,
                JSON.stringify({id,name,team_id,createAt})
            );
            state.id = id;
            state.name = name;
            state.team_id = team_id;
            state.createAt = createAt;
        },
        clearProject: (state, action) => {
            localStorage.removeItem(teamKey);
            state.id = null;
            state.name = null;
            state.team_id = null;
            state.createAt = null;
        },
    },
});

export const { setProject, clearProject} = projectSlice.actions;
export const teamReducer = projectSlice.reducer;

