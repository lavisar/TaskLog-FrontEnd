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
import { setUser, userReducer } from "./slices/userSlice";

import { usersApi } from "./apis/usersApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { teamsApi } from "./apis/teamsApi";
import {
  currentMemberReducer,
  setCurrentMember,
} from "./slices/currentMemberSlice";

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
    currentMember: currentMemberReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware);
  },
  devTools: true,
});

setupListeners(store.dispatch);

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
  //currentMember
  setCurrentMember,
};

export { useLoginMutation } from "./apis/features/authLoginApi";
export {
  useGetAllUsersQuery,
  useSignUpMutation,
  useGetPersonalAccountQuery,
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
