import { Card } from "@mui/material";
import { useGetAllTeamsQuery } from "../../store";
import TeamCreator from "./components/team/TeamCreator";
import CustomGrid from "../../components/table/CustomGrid";
import CustomLink from "../../components/CustomLink";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { CgDetailsMore } from "react-icons/cg";
import { useEffect } from "react";

export default function TeamList() {
  useEffect(() => {
    document.title = "Teams List";
  }, [])

  const { data, isLoading, isSuccess } = useGetAllTeamsQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const config = [
      {
        id: 'id',
        label: "Id",
        flex: 0.4,
      },
      {
        id: "teamName",
        label: "Team Name",
        flex: 0.5,
      },
      {
        id: "description",
        label: "Description",
      },
      {
        id: "createdAt",
        label: "Created At",
        flex: 0.7,
      },
      {
        id: "createdBy",
        label: "Created By",
        flex: 0.6,
        renderCell: (team) => <TeamCreator teamId={team.id} />
      },
      {
        id: "details",
        label: "Details",
        flex: 0.5,
        renderCell: (team) => <div>
          <CustomLink to={`${WEBLINKS.ADMIN_TEAM_DETAIL}/${team.id}`} className="text-blue-500 border border-blue-500 rounded-full px-2 flex items-center hover:bg-blue-300">
            <CgDetailsMore className="mr-1" />
            Details
          </CustomLink>
        </div>
      },
    ]
    content = <CustomGrid data={data} config={config} pageSize={10} />
  }
  return <Card>
    {content}
  </Card>
}