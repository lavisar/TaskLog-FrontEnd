import { authApi } from "./features/authApi";

export const projectApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: () => "/projects",
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
                    url: `/projects/${id}`,
                    method: "PUT",
                    body,
                };
            },
        }),
    }),
});

