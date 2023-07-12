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
    }),
    getTasksByProject: builder.query({
      providesTags: ['Task', 'TaskAdd', 'TaskUpdate'],
      query: (id) => `/task?projectId=${id}`,
    }),
    updateTask: builder.mutation({
      invalidatesTags: ['TaskUpdate'],
      query: (body) => {
        return {
          method: "POST",
          url: "/task/update",
          body
        }
      }
    })
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useGetTasksByProjectQuery, useUpdateTaskMutation } = taskApi;
