import { useGetAllMembersDetailsQuery } from "../../../../store"
import { TeamRole } from "../../../../store/constants/Role";

export default function TeamCreator({ teamId }) {
  const { data, isSuccess } = useGetAllMembersDetailsQuery(teamId);

  let creator;
  if (isSuccess) {
    creator = data.map((mem) => {
      return (mem.teamMemberRole === TeamRole.CREATOR) ? (
        <div key={mem.email}>
          <p>Username: {mem.username}</p>
          <p>Email: {mem.email}</p>
        </div>
      ) : <div></div>;
    });
  }

  return <div>
    {creator}
  </div>
}