import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/features/authApi";
import { authReducer } from "./apis/features/authSlice";
import {
  changeEmail,
  changeUsername,
  changePassword,
  changeBio,
  changePic,
  signupFormReducer,
} from "./slices/signupFormSlice";
import { setCredentials, logOut } from "./apis/features/authSlice";
import { usersApi } from "./apis/usersApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    // authorization
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,

    // users
    [usersApi.reducerPath]: usersApi.reducer,
    signupForm: signupFormReducer,
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
  // signup form
  changeEmail,
  changeUsername,
  changePassword,
  changeBio,
  changePic,
};

export { useLoginMutation } from "./apis/features/authLoginApi";
export { useGetUsersQuery, useSignUpMutation } from "./apis/usersApi";
