import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllMembersDetailsQuery, useGetTeamQuery } from "../../store";
import { WEBLINKS } from "../../store/constants/WebLinks";
import CustomTable from "../../components/table/CustomTable";
import { API_INSTANCE } from "../../store/apis/features/apisConst";
import CustomTableSortable from "../../components/table/CustomTableSortable";
import UserCurrentTeamRole from "./UserCurrentTeamRole";

export default function UserCurrentTeam() {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: teamData,
    isLoading: teamIsLoading,
    isSuccess: teamIsSuccess,
    isError: teamIsError,
    error: teamError
  } = useGetTeamQuery(teamId);
  if (teamIsError) {
    navigate(WEBLINKS.MAIN);
  } else if (teamIsSuccess) {
    console.log(teamData);
  }

  const {
    data: membersData,
    isLoading: membersIsLoading,
    isSuccess: membersIsSuccess,
    isError: membersIsError,
    error: membersError
  } = useGetAllMembersDetailsQuery(teamId);
  console.log(membersData);

  const config = [
    {
      id: 'pic',
      label: '',
      renderCell: (member) => (
        <span>
          <img src={`${API_INSTANCE.BASE_URL}/auth/image/${member.pic}`} className="rounded-full max-h-12 aspect-square object-cover m-0" alt="Profile pic of member" />
        </span>
      ),
      align: 'right',
    },
    {
      id: 'username',
      label: 'Name',
      renderCell: (member) => member.username,
      sortValue: (member) => member.username,
    },
    {
      id: 'email',
      label: 'Email',
      renderCell: (member) => member.email,
      sortValue: (member) => member.email,
    },
    {
      id: 'teamMemberRole',
      label: 'Role',
      renderCell: (member) => (
        <UserCurrentTeamRole
          currentRole={member.teamMemberRole}
          memberId={member.teamMemberId}
        />
      ),
      sortValue: (member) => member.teamMemberRole,
    },
    {
      id: 'addedAt',
      label: 'Joined Date',
      renderCell: (member) => member.addedAt,
      sortValue: (member) => member.addedAt,
    },
  ]

  let content
  if (membersIsLoading) {
    content = <h1>Loading...</h1>;
  } else if (membersIsError) {
    console.log(membersError)
  } else if (membersIsSuccess) {
    content = <CustomTableSortable data={membersData} config={config} />
  }
  return (
    <div>
      <h2>Member List</h2>
      {content}
    </div>
  );
}