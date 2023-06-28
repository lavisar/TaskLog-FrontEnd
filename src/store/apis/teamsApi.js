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
    getAllMembersDetails: builder.query({
      query: (teamId) => {
        return {
          url: `/team/${teamId}/all-members-details`,
        };
      },
    }),
    changeMemberRole: builder.query({
      query: (body) => {
        return {
          url: "/team/change-member-role",
          method: "POST",
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
  useGetAllMembersDetailsQuery,
} = teamsApi;
