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
      invalidatesTags: (result, error, admin) => {
        return [{ type: "SignUp", id: "S" }];
      },
    }),
    createAdmin: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: "/auth/create-admin",
          body,
        };
      },
      invalidatesTags: (result, error, admin) => {
        return [{ type: "CreateAdmin", id: "Add" }];
      },
    }),
    getAllUsers: builder.query({
      query: () => "/auth/all-users",
      providesTags: (result, error, user) => {
        const tags = result.map((user) => {
          return { type: "DeleteUser", id: user.id };
        });
        tags.push({ type: "CreateAdmin", id: "Add" });
        tags.push({ type: "SignUp", id: "S" });
        tags.push({ type: "UpdateUser", id: "Up" });
        tags.push({ type: "ChangeRole", id: "Role" });
        return tags;
      },
      // keepUnusedDataFor: 10,
    }),
    getUser: builder.query({
      query: (id) => `/auth/user/${id}`,
      providesTags: (result, error, user) => {
        const tags = [];
        tags.push({ type: "UpdateUser", id: "Up" });
        tags.push({ type: "ChangeRole", id: "Role" });
        return tags;
      },
    }),
    getPersonalAccount: builder.query({
      query: () => "/auth/account",
      providesTags: (result, error, user) => {
        const tags = [];
        tags.push({ type: "UpdateUser", id: "Up" });
        tags.push({ type: "ChangeRole", id: "Role" });
        return tags;
      },
    }),
    updateUser: builder.mutation({
      invalidatesTags: (result, error, user) => {
        return [{ type: "UpdateUser", id: "Up" }];
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
      invalidatesTags: (result, error, user) => {
        return [{ type: "ChangeRole", id: "Role" }];
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/auth/user/delete/${id}`,
        };
      },
      invalidatesTags: (result, error, id) => {
        return [{ type: "DeleteUser", id: id }];
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useCreateAdminMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetPersonalAccountQuery,
  useUpdateUserMutation,
  useDeleteImageMutation,
  useChangePasswordMutation,
  useChangeAdminRoleMutation,
  useDeleteUserMutation,
} = usersApi;
