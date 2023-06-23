import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/features/authApi";
import { authReducer } from "./apis/features/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
  devTools: true,
});
