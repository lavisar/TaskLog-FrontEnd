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
    getUser: builder.query({
      query: (id) => `/auth/user/${id}`,
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
    changeAdminRole: builder.mutation({
      query: (body) => {
        return {
          method: "PUT",
          url: "/auth/admin-role",
          body,
        };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetPersonalAccountQuery,
  useUpdateUserMutation,
  useDeleteImageMutation,
  useChangePasswordMutation,
  useChangeAdminRoleMutation,
} = usersApi;
