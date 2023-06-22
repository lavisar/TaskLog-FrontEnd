import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apis/features/apiSlice";
import { authReducer } from "./apis/features/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true,
});
