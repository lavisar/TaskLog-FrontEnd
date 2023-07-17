import { authApi } from "./features/authApi";

export const submitApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createSumit: builder.mutation({
			invalidatesTags: ["SubmitAdd"],
			query: (body) => {
				return {
					method: "POST",
					url: "submit/upload",
					body,
				};
			},
		}),
		getSubmitsByTaskId: builder.query({
			providesTags: ["Submit"],
			query: (taskId) => `/submit/${taskId}`,
		}),
		deleteSubmitById: builder.mutation({
			invalidatesTags: ["Submit"],
			query: (id) => {
				return {
					method: "DELETE",
					url: `/submit/${id}`,
				};
			},
		}),
	}),
});

export const {
	useCreateSumitMutation,
	useGetSubmitsByTaskIdQuery,
	useDeleteSubmitByIdMutation,
} = submitApi;
