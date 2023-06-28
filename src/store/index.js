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
import { setTeam, teamReducer } from "./slices/teamSlice";

import { usersApi } from "./apis/usersApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { teamsApi } from "./apis/teamsApi";
import { taskApi } from "./apis/taskApi";
import { setTasks, taskReducer } from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    // authorization
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,

    // users
    [usersApi.reducerPath]: usersApi.reducer,
    signupForm: signupFormReducer,

    // teams
    [teamsApi.reducerPath]: teamsApi.reducer,
    team: teamReducer,

    // tasks
    [taskApi.reducerPath]: taskApi.reducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware);
      // .concat(taskApi.middleware);
  },
  devTools: true,
});

setupListeners(store.dispatch);

export {
  store,
  setCredentials,
  logOut,
  // signup form
  changeEmail,
  changeUsername,
  changePassword,
  changeBio,
  changePic,
  //team
  setTeam,
  //task
  setTasks,
};

export { useLoginMutation } from "./apis/features/authLoginApi";
export { useGetUsersQuery, useSignUpMutation } from "./apis/usersApi";
export {
  useGetAllUserTeamsQuery,
  useCreateTeamMutation,
  useGetTeamQuery,
} from "./apis/teamsApi";
export { useGetTasksQuery } from "./apis/taskApi"
