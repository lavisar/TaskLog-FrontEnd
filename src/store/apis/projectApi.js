import { authApi } from "./features/authApi";

export const projectApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProjects: builder.query({
<<<<<<< HEAD
            query: () => "/projects/getAll",
=======
            query: () => "/projects",
>>>>>>> a1db39331880bb00614f09f3f08d7303d74afc5d
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
<<<<<<< HEAD

        findProjectByName: builder.query({
            query: (name) => `/projects/${name}`,
          }),
=======
>>>>>>> a1db39331880bb00614f09f3f08d7303d74afc5d
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
<<<<<<< HEAD
                    url: `/projects/${body.id}`,
=======
                    url: `/projects/${id}`,
>>>>>>> a1db39331880bb00614f09f3f08d7303d74afc5d
                    method: "PUT",
                    body,
                };
            },
        }),
    }),
});

<<<<<<< HEAD
export const {
    useCreateProjectsMutation,
    useDeleteProjectsMutation,
    useFindProjectByNameQuery,
    useGetAllProjectsQuery,
    useUpdateProjectsMutation
} = projectApi

=======
>>>>>>> a1db39331880bb00614f09f3f08d7303d74afc5d
