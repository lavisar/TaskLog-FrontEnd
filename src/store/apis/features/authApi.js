import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_INSTANCE, pause } from "./apisConst";
import { setCredentials, logOut, selectCurrentRefreshToken } from "./authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../..";

/**
 * Add headers to the request
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_INSTANCE.BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },

  /**
   *  Loading test
   *  REMOVE FOR PRODUCTION
   * @param  {...any} args
   * @returns
   */
  fetchFn: async (...args) => {
    await pause(1500);
    return fetch(...args);
  },
});

const refreshToken = createAsyncThunk(
  "auth/refreshtoken",
  async (_, { getState }) => {
    console.log("Sending refresh token...");
    const refreshToken = selectCurrentRefreshToken(getState());
    const response = await axios.post(
      `${API_INSTANCE.BASE_URL}/auth/refreshtoken`,
      { refreshToken }
    );
    return response.data;
  }
);

// For multiple unauthenticated synchronous requests
let refreshResult = null;
let isFetchingToken = false;
const waitForRefreshToken = async (api, triesLeft = 5) => {
  // wait for the first one to be done
  if (!isFetchingToken) {
    isFetchingToken = true;
    refreshResult = await api.dispatch(refreshToken());
    isFetchingToken = false;
  } else {
    await new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (!isFetchingToken) {
          clearInterval(interval);
          resolve();
        } else if (triesLeft <= 1) {
          reject();
          clearInterval(interval);
        }
        console.log(isFetchingToken);
        triesLeft--;
      }, 200);
    });
  }
  return refreshResult;
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(args);
  if (result?.error?.status === 401) {
    const hasRefreshToken = store.getState().auth.refreshToken;
    if (hasRefreshToken) {
      try {
        // fetch new token
        const refreshDone = await waitForRefreshToken(api);
        if (refreshDone?.payload) {
          const user = api.getState().auth.user;
          // store new token
          api.dispatch(setCredentials({ ...refreshDone.payload, user }));
          // retry the orginal query with new access token
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } catch (error) {
        console.log(error);
        api.dispatch(logOut());
      }
    }
  }

  return result;
};

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
