import { authApi } from "./features/authApi";

export const milestoneApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMilestone: builder.query({
      providesTags: ["Milestone"],
      query: () => "/milestone/getAll",
    }),
    findMilestoneByName: builder.query({
      query: (name) => `/milestone/${name}`,
    }),

    deleteMilestone: builder.mutation({
      invalidatesTags: ["Milestone"],
      query: (id) => {
        return {
          url: `/milestone/${id}`,
          method: "DELETE",
        };
      },
    }),
    findMilestonesByProjectId: builder.query({
      providesTags: ["Milestone"],
      query: (projectId) => `/milestone/findByProject/${projectId}`,
    }),

    updateMilestone: builder.mutation({
      invalidatesTags: ["Milestone"],
      query: (body) => {
        return {
          url: `/milestone/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    createMilestone: builder.mutation({
      invalidatesTags: ["Milestone"],
      query: (body) => {
        return {
          url: `/milestone/create`,
          method: "POST",
          body,
          params: { projectId: body.projectId },
        };
      },
    }),
    getMilestone: builder.query({
      providesTags: ["Milestone"],
      query: (milestoneId) => `/milestone/get/${milestoneId}`,
    }),
  }),

});

export const {
  useCreateMilestoneMutation,
  useDeleteMilestoneMutation,
  useFindMilestoneByNameQuery,
  useGetAllMilestoneQuery,
  useUpdateMilestoneMutation,
  useGetMilestoneQuery,
  useFindMilestonesByProjectIdQuery
} = milestoneApi