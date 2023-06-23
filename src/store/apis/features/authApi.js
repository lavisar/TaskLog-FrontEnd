import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_INSTANCE, pause } from "./apisConst";
import { setCredentials, logOut, selectCurrentRefreshToken } from "./authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
});

const refreshToken = createAsyncThunk(
  "auth/refreshtoken",
  async (_, { getState }) => {
    const refreshToken = selectCurrentRefreshToken(getState());
    console.log(refreshToken);
    const response = await baseQuery("/auth/refreshtoken", {
      method: "POST",
      body: { refreshToken },
    });
    return response.data;
  }
);

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(args, api, extraOptions);
  if (result?.error?.originalStatus === 401) {
    console.log("sending refresh token");
    // const refreshResult = await baseQuery(
    //   "/auth/refreshtoken",
    //   api,
    //   extraOptions
    // );
    // console.log(refreshResult);
    // if (refreshResult?.data) {
    //   const user = api.getState().auth.user;
    //   // store the new token
    //   api.dispatch(setCredentials({ ...refreshResult.data, user }));
    //   // retry the orginal query with new access token
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   api.dispatch(logOut());
    // }

    try {
      // fetch new token
      const refreshResult = await api.dispatch(refreshToken());
      console.log(refreshResult);
      if (refreshResult?.data) {
        const user = api.getState().auth.user;
        // store new token
        api.dispatch(setCredentials({ ...refreshResult.data, user }));
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
