import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Link,
  List,
  ListItem,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CiCircleAlert, CiCircleList } from "react-icons/ci";
import { MdOutlineAdminPanelSettings, MdManageAccounts } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { useState } from "react";
import CustomLink from "./CustomLink";

const expandIcon = <ExpandMoreIcon />;

const listItems = [
  {
    icon: <MdOutlineAdminPanelSettings />,
    summary: "Admin Management",
    children: [
      {
        icon: <MdManageAccounts />,
        link: "Account Details",
        path: "/admin/account",
      },
      {
        icon: <FaUsers />,
        link: "User List",
        path: "/admin/all-users",
      },
      {
        icon: null,
        link: "Create Admin",
        path: "/admin/create-admin",
      },
    ],
  },
  {
    icon: <RiTeamLine />,
    summary: "Team Management",
    children: [
      {
        icon: null,
        link: "Team List",
        path: "/admin/all-team",
      },
      {
        icon: null,
        link: "Team Details",
        path: "/admin/team",
      },
    ],
  },
];

function AdminSideBar() {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (e, isEpanded) => {
    setExpanded(isEpanded ? panel : false);
  };
  return (
    <div>
      <Toolbar />
      <Divider />
      {listItems.map((item, index) => (
        <Accordion
          key={index}
          className="w-full text-lg"
          expanded={expanded === `panel_${index}`}
          onChange={handleChange(`panel_${index}`)}
          disableGutters
        >
          <AccordionSummary
            expandIcon={expandIcon}
            aria-controls={"acc" + index + "content"}
            id={"acc" + index + "header"}
            sx={{ color: "#26bb98" }}
          >
            <div className="px-2">{item.icon || <CiCircleList />}</div>
            <Typography fontWeight="bold">{item.summary}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <List>
              {item.children.map((child, childIndex) => (
                <ListItem key={"child_" + childIndex} disablePadding>
                  <CustomLink
                    to={child.path}
                    className="w-full"
                    activeClassName="font-bold border-1-4 border-blue-500 text-green-400"
                  >
                    <div className="flex flex-row items-center">
                      <span className="px-2">
                        {child.icon || <CiCircleAlert />}
                      </span>
                      <span>{child.link}</span>
                    </div>
                  </CustomLink>
                  <Link href={child.path} underline="none"></Link>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default AdminSideBar;
