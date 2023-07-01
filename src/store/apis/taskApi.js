import { authApi } from "./features/authApi";

export const taskApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/task/getAll",
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
