import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/features/authApi";
import { authReducer } from "./apis/features/authSlice";
import { setCredentials, logOut } from "./apis/features/authSlice";
import {
  changeEmail,
  changeUsername,
  changePassword,
  changeBio,
  changePic,
  signupFormReducer,
} from "./slices/signupFormSlice";
import { setTeam, clearTeam, teamReducer } from "./slices/teamSlice";
import { setUser, userReducer } from "./slices/userSlice";

import { usersApi } from "./apis/usersApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  currentMemberReducer,
  setCurrentMember,
  clearCurrentMember,
} from "./slices/currentMemberSlice";
import { taskApi } from "./apis/taskApi";
import { setTasks, taskReducer } from "./slices/taskSlice";
import { teamsApi } from "./apis/teamsApi";

const store = configureStore({
  reducer: {
    // authorization
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,

    // users
    [usersApi.reducerPath]: usersApi.reducer,
    signupForm: signupFormReducer,
    user: userReducer,

    // teams
    [teamsApi.reducerPath]: teamsApi.reducer,
    team: teamReducer,

    // tasks
    [taskApi.reducerPath]: taskApi.reducer,
    tasks: taskReducer,
    currentMember: currentMemberReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(taskApi.middleware);
  },
  devTools: true,
});

setupListeners(store.dispatch);

// to simplify import
export {
  store,
  setCredentials,
  logOut,

  // signupForm
  changeEmail,
  changeUsername,
  changePassword,
  changeBio,
  changePic,

  // user
  setUser,

  // team
  setTeam,
  clearTeam,

  //task
  setTasks,

  //currentMember
  setCurrentMember,
  clearCurrentMember,
};

export { useLoginMutation } from "./apis/features/authLoginApi";
export {
  useGetAllUsersQuery,
  useSignUpMutation,
  useGetPersonalAccountQuery,
  useUpdateUserMutation,
  useDeleteImageMutation,
} from "./apis/usersApi";
export {
  useGetAllUserTeamsQuery,
  useCreateTeamMutation,
  useGetTeamQuery,
  useGetCurrentMemberQuery,
  useGetAllMembersDetailsQuery,
  useChangeMemberRoleMutation,
  useRemoveMemberMutation,
  useAddMemberMutation,
  useDeleteTeamMutation,
  useUpdateTeamMutation,
  useGetAllTeamsQuery,
} from "./apis/teamsApi";
export { useGetTasksQuery, useCreateTaskMutation } from "./apis/taskApi"
