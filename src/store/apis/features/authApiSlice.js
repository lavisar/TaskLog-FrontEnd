import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentails) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentails },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
