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
    updateUser: builder.mutation({
      query: (body) => {
        return {
          method: "PUT",
          url: "/auth/user/update",
          body,
        };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetAllUsersQuery,
  useGetPersonalAccountQuery,
  useUpdateUserMutation,
} = usersApi;
