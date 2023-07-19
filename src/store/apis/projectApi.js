import { authApi } from "./features/authApi";

export const projectApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => "/projects/getAll",
      providesTags: (result, error, project) => {
        const tags = [];
        tags.push({ type: "ProjectDelete", id: "DelProj" });
        tags.push({ type: "ProjectCreate", id: "CreateProj" });
        tags.push({ type: "UpdateProject", id: "UpPrj"});
        return tags;
      },
    }),
    // createProject: builder.mutation({
    //     query: (body) => {
    //         return {
    //             url: "/projects/create",
    //             method: "POST",
    //             body,
    //         };
    //     },
    // }),

    getProject: builder.query({
      query: (projectId) => `/projects/get/${projectId}`,
    }),

    findProjectByName: builder.query({
      query: (name) => `/projects/${name}`,
    }),
    createProjects: builder.mutation({
      invalidatesTags: (result, error, project) => {
        return [{ type: "ProjectCreate", id: "CreateProj" }];
      },
      query: (body) => {
        return {
          url: `/projects/create`,
          method: "POST",
          body,
          params: { teamId: body.team_id },
        };
      },
    }),
    deleteProjects: builder.mutation({
      query: (id) => {
        return {
          url: `/projects/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => {
        return [{ type: "ProjectDelete", id: "DelProj" }];
      },
    }),
    updateProjects: builder.mutation({
      query: (body) => {
        return {
          url: `/projects/${body.id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, id) => {
        return [{ type: "UpdateProject", id: "UpPrj" }];
      },
    }),
  }),
});

export const {
  useCreateProjectsMutation,
  useDeleteProjectsMutation,
  useGetAllProjectsQuery,
  useUpdateProjectsMutation,
  useGetProjectQuery,
} = projectApi;
