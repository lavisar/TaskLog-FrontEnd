import { authApi } from "./features/authApi";

export const usersApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: "/auth/signup",
          body,
        };
      },
    }),
    getUsers: builder.query({
      query: () => "/auth/all-users",
      // keepUnusedDataFor: 10,
    }),
  }),
});

export const { useSignUpMutation, useGetUsersQuery } = usersApi;
