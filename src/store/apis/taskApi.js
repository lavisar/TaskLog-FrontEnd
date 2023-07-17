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
      providesTags: ['Task', 'TaskAdd', 'TaskUpdate', 'x'],
      query: (id) => `/task?projectId=${id}`,
    }),
    updateTask: builder.mutation({
      invalidatesTags: ['TaskUpdate','getTaskByUser'],
      query: (body) => {
        return {
          method: "POST",
          url: "/task/update",
          body
        }
      }
    }),
    getTaskByUser: builder.query({
      providesTags: ["getTaskByUser"],
      invalidatesTags: ['TaskAdd', 'TaskUpdate', 'x'],
      query: (userId) => `/task/${userId}`
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useGetTasksByProjectQuery, useUpdateTaskMutation, useGetTaskByUserQuery } = taskApi;
