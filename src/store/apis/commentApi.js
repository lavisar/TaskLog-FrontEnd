import { authApi } from "./features/authApi";

export const commentApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createComment: builder.mutation({
			invalidatesTags: ["Comment"],
			query: (body) => {
				return {
					method: "POST",
					url: "comment/create",
					body,
				};
			},
		}),
		updateComment: builder.mutation({
			invalidatesTags: ["CommentUpdate"],
			query: (id, body) => {
				return {
					method: "PUT",
					url: `comment/${id}`,
					body,
				};
			},
		}),
		getCommentsByTaskId: builder.query({
			providesTags: ["Comment"],
			query: (taskId) => `/comment/${taskId}`,
		}),
		deleteCommentById: builder.mutation({
			invalidatesTags: ["Comment"],
			query: (id) => {
				return {
					method: "DELETE",
					url: `/comment/${id}`,
				};
			},
		}),
	}),
});

export const {
	useCreateCommentMutation,
	useDeleteCommentByIdMutation,
	useGetCommentsByTaskIdQuery,
	useUpdateCommentMutation,
} = commentApi;
