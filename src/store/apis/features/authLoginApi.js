import { authApi } from "./authApi";

export const authLoginApi = authApi.injectEndpoints({
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

export const { useLoginMutation } = authLoginApi;
