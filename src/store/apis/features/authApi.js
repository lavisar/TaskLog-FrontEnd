import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_INSTANCE, pause } from "./apisConst";
import { setCredentials, logOut, selectCurrentRefreshToken } from "./authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    const refreshToken = selectCurrentRefreshToken(getState());
    const response = await axios.post(
      `${API_INSTANCE.BASE_URL}/auth/refreshtoken`,
      { refreshToken }
    );
    return response.data;
  }
);

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    try {
      // fetch new token
      const refreshResult = await api.dispatch(refreshToken());
      if (refreshResult?.payload) {
        const user = api.getState().auth.user;
        // store new token
        api.dispatch(setCredentials({ ...refreshResult.payload, user }));
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

  return result;
};

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
