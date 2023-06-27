import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTeamQuery } from "../../store";
import { WEBLINKS } from "../../store/constants/WebLinks";

export default function UserCurrentTeam() {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetTeamQuery(teamId);

  console.log(data);
  let content;
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isError) {
    navigate(WEBLINKS.MAIN);
  }
  return (
    <div>
      <h2>Member List</h2>
    </div>
  );
}