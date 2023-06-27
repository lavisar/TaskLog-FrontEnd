import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetTeamQuery } from "../../store";

export default function UserProjects() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError, error } = useGetTeamQuery(id);
  console.log(data);

  return (
    <div>
      <h1>Project List</h1>
    </div>
  );
}