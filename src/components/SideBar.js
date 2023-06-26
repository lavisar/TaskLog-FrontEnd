import { Box, Divider, Toolbar } from "@mui/material";
import { CiCircleAlert } from "react-icons/ci";
import CustomLink from "./CustomLink";
import { BiSolidDashboard } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { RiTeamFill } from "react-icons/ri";

const listItems = [
  {
    icon: <BiSolidDashboard />,
    link: "TASK BOARD",
    path: "/",
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
    icon: <RiTeamFill />,
    link: "TEAM",
    path: null,
  },
];

export default function SideBar() {
  return (
    <Box sx={{ minHeight: "100vh" }} className="bg-slate-950">
      <Toolbar></Toolbar>
      <Divider />
      {listItems.map((item, index) => (
        <Box key={index}>
          <CustomLink
            to={item.path}
            className="text-xl text-white rounded-2xl ease-in-out hover:bg-green-400 hover:mx-3 duration-300"
            activeClassName="m-3 font-bold bg-green-400 rounded-2xl text-black "
          >
            <div className="flex flex-row items-center p-2">
              <span className="px-2">{item.icon || <CiCircleAlert />}</span>
              <span>{item.link}</span>
            </div>
          </CustomLink>
        </Box>
      ))}
    </Box>
  );
}
