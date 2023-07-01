import { authApi } from "./features/authApi";

export const taskApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      providesTags: ['Task', 'TaskAdd'],
      query: () => "/task/getAll",
    }),
    createTask: builder.mutation({
      invalidatesTags: ['TaskAdd'],
      query: (body) => {
        return {
          method: "POST",
          url: "/task/create",
          body,
        };
      },
    })
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = taskApi;
