import { authApi } from "./features/authApi";

export const projectApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: () => "/projects/getAll",
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
                return [{type: "ProjectCreate", id: project.teamId}];
            },
            query: (body) => {
                return {
                    url: "/projects/create",
                    method: "POST",
                    body,
                };
            },
        }),
        deleteProjects: builder.mutation({
            query: (id) =>{
                return{
                    url: `/projects/${id}`,
                    method: "DELETE",
                };
            },
        }),
        updateProjects: builder.mutation({
            query: (body) => {
                return{
                    url: `/projects/${body.id}`,
                    method: "PUT",
                    body,
                };
            },
        }),
    }),
});

export const{
    useCreateProjectsMutation,
    useDeleteProjectsMutation,
    useGetAllProjectsQuery,
    useUpdateProjectsMutation,
    useGetProjectQuery

} = projectApi

