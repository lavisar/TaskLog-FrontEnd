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
      invalidatesTags: (result, error, user) => {
        const fieldId = user.get("image").name;
        return [{ type: "UserPic", id: fieldId }];
      },
      query: (body) => {
        return {
          method: "PUT",
          url: "/auth/user/update",
          body,
        };
      },
    }),
    deleteImage: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/auth/image/delete/${id}`,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (body) => {
        return {
          method: "PUT",
          url: "/auth/user/change-password",
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
  useDeleteImageMutation,
  useChangePasswordMutation,
} = usersApi;
