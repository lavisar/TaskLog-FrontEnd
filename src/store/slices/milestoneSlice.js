// import { createSlice } from "@reduxjs/toolkit";
// import { LOCAL_STORAGE_KEYS } from "../constants/LocalStorageKeys";

// const currentMemberKey = LOCAL_STORAGE_KEYS.CURRENT_MEMBER;
// function decodeValue(key) {
//   if (localStorage.getItem(currentMemberKey)) {
//     return JSON.parse(localStorage.getItem(currentMemberKey))[key];
//   }
//   return null;
// }

// const milestoneSlice = createSlice({
//     name: "milestone",
//     initialState: {
//         milestoneId: decodeValue("milestoneId"),
//         projectId: decodeValue("projectId"),
//         name: decodeValue("name"),
//         description: decodeValue("description"),
//         fromdate: decodeValue("fromdate"),
//         todate: decodeValue("todate"),
//     },
//     reducers: {
        
//     }
// })