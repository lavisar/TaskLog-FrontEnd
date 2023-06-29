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
    getAllUsers: builder.query({
      query: () => "/auth/all-users",
      // keepUnusedDataFor: 10,
    }),
    getPersonalAccount: builder.query({
      query: () => "/auth/account",
    }),
  }),
});

export const { useSignUpMutation, useGetAllUsersQuery } = usersApi;
