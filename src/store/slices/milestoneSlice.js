import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../constants/LocalStorageKeys";

const milestone = LOCAL_STORAGE_KEYS.MILESTONE;
function decodeValue(key) {
  if (localStorage.getItem(milestone)) {
    return JSON.parse(localStorage.getItem(milestone))[key];
  }
  return null;
}

const milestoneSlice = createSlice({
    name: "milestone",
    initialState: {
        milestoneId: decodeValue("milestoneId"),
        projectId: decodeValue("projectId"),
        name: decodeValue("name"),
        description: decodeValue("description"),
        fromdate: decodeValue("fromdate"),
        todate: decodeValue("todate"),
    },
    reducers: {
      setMilestone: (state, action) =>{
        const{
          milestoneId,
          projectId,
          name,
          description,
          fromdate,
          todate,
        } = action.payload;
        localStorage.setItem(
          milestone,
          JSON.stringify({
            milestoneId,
            projectId,
            name,
            description,
            fromdate,
            todate,
          })
        );
        state.milestoneId=milestoneId;
        state.projectId=projectId;
        state.name=name;
        state.description=description;
        state.fromdate=fromdate;
        state.todate=todate;
      },
      clearMilestone: (state, action) =>{
        localStorage.removeItem(milestone);
        state.milestoneId=null;
        state.projectId=null;
        state.name=null;
        state.description=null;
        state.fromdate=null;
        state.todate=null;
      },
        
    },
});
export const {setMilestone, clearMilestone} = milestone.actions;
export const milestoneReducer = milestoneSlice.reducer;