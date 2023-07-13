import { Box, Toolbar, Typography } from "@mui/material";
import { CiCircleAlert } from "react-icons/ci";
import CustomLink from "./CustomLink";
import { BiSolidDashboard } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { RiTeamFill } from "react-icons/ri";

import { WEBLINKS } from "../store/constants/WebLinks";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { LuMilestone } from "react-icons/lu";

export default function SideBar() {
  const currentTeam = createSelector(
    (state) => state.team.id,
    (state) => state.team.teamName,
    (state) => state.currentMember.teamMemberRole,
    (teamId, teamName, teamMemberRole) => ({ teamId, teamName, teamMemberRole })
  );
  const { teamId, teamName, teamMemberRole } = useSelector(currentTeam);
  const listItems = [
    {
      icon: <RiTeamFill />,
      link: "TEAM",
      path: `${WEBLINKS.TEAMS}/${teamId}`,
    },
    {
      icon: <BiSolidDashboard />,
      link: "TASK BOARD",
      path: WEBLINKS.TASK,
    },
    {
      icon: <FaTasks />,
      link: "MY TASK",
      path: "/",
    },
    {
      icon: <HiDocumentDuplicate />,
      link: "DOCUMENTS",
      path: null,
    },
    {
      icon: <LuMilestone />,
      link: "MILESTONE",
      path: null,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }} className="bg-slate-950">
      <Toolbar className="text-white flex-col !text-left">
        <div className="w-full pt-5 select-none">
          <Typography variant="h5">{teamName}</Typography>
          <p className="text-gray-400">Role: {teamMemberRole}</p>
        </div>
      </Toolbar>
      {listItems.map((item, index) => (
        <div key={index} className="p-2">
          <CustomLink
            to={item.path}
            className="text-xl text-white rounded-2xl ease-in-out hover:bg-green-400 hover:mx-3 duration-300 select-none"
            activeClassName="mx-4 font-bold bg-green-400 rounded-2xl text-black"
            // linkClass="items-center"
          >
            <div className="flex flex-row items-center p-2">
              <span className="px-2">{item.icon || <CiCircleAlert />}</span>
              <span>{item.link}</span>
            </div>
          </CustomLink>
        </div>
      ))}
    </Box>
  );
}
