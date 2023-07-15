import { authApi } from "./features/authApi";

export const documentApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createDocument: builder.mutation({
			invalidatesTags: ["Document"],
			query: (body) => {
				return {
					method: "POST",
					url: "/document/create",
					body,
				};
			},
		}),
		getDocumentsByProjectId: builder.query({
			providesTags: ["Document"],
			query: (projectId) => `/document/${projectId}`,
		}),
		getDocumentByName: builder.query({
			providesTags: ["Document"],
			query: (file) => `/document/${file}`,
		}),
		// getFileDownload: builder.query({
		// 	providesTags: ["Document"],
		// 	query: (fileId) => `/document/download/${fileId}`,
		// }),
		deleteDocumentById: builder.mutation({
			invalidatesTags: ["Document"],
			query: (id) => {
				return {
					method: "DELETE",
					url: `/document/${id}`,
				};
			},
		}),
	}),
});

export const {
	useCreateDocumentMutation,
	useGetDocumentsByProjectIdQuery,
	useGetDocumentByNameQuery,
	// useGetFileDownloadQuery,
	useDeleteDocumentByIdMutation,
} = documentApi;
