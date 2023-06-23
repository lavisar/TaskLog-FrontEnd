import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_INSTANCE, pause } from "./features/apisConst";

const usersApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: API_INSTANCE.BASE_URL,

    // Loading test
    // REMOVE FOR PRODUCTION
    fetchFn: async (...args) => {
      await pause(500);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      
    };
  },
});

