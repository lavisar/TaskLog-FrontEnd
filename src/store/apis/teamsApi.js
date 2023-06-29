import { authApi } from "./features/authApi";

export const teamsApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserTeams: builder.query({
      query: () => {
        return {
          url: "/team/user",
        };
      },
    }),
    createTeam: builder.mutation({
      query: (body) => {
        return {
          url: "/team/create",
          method: "POST",
          body,
        };
      },
    }),
    getTeam: builder.query({
      query: (id) => {
        return {
          url: `/team/${id}`,
        };
      },
    }),
    getCurrentMember: builder.query({
      query: (teamId) => {
        return {
          url: `/team/${teamId}/current-member`,
        };
      },
    }),
    getAllMembersDetails: builder.query({
      providesTags: (result, error, teamId) => {
        const tags = result.map((member) => {
          return { type: "Member", id: member.teamMemberId };
        });
        tags.push({ type: "MemberAdd", id: teamId });
        return tags;
      },
      query: (teamId) => {
        return {
          url: `/team/${teamId}/all-members-details`,
        };
      },
    }),
    changeMemberRole: builder.mutation({
      query: (body) => {
        return {
          url: "/team/change-member-role",
          method: "PUT",
          body,
        };
      },
    }),
    removeMember: builder.mutation({
      invalidatesTags: (result, error, id) => {
        return [{ type: "Member", id }];
      },
      query: (id) => {
        return {
          url: `/team/remove-member/${id}`,
          method: "DELETE",
        };
      },
    }),
    addMember: builder.mutation({
      invalidatesTags: (result, error, member) => {
        return [{ type: "MemberAdd", id: member.teamId }];
      },
      query: (body) => {
        return {
          url: "/team/add-member",
          method: "POST",
          body,
        };
      },
    }),
    deleteTeam: builder.mutation({
      query: (id) => {
        return {
          url: `/team/delete/${id}`,
          method: "DELETE",
        };
      },
    }),
    updateTeam: builder.mutation({
      query: (body) => {
        return {
          url: "/team/update",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAllUserTeamsQuery,
  useCreateTeamMutation,
  useGetTeamQuery,
  useGetCurrentMemberQuery,
  useGetAllMembersDetailsQuery,
  useChangeMemberRoleMutation,
  useRemoveMemberMutation,
  useAddMemberMutation,
  useDeleteTeamMutation,
  useUpdateTeamMutation,
} = teamsApi;
