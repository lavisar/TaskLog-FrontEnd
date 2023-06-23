import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CiCircleAlert, CiCircleList } from "react-icons/ci";

const expandIcon = <ExpandMoreIcon />;

const listItems = [
  {
    icon: null,
    summary: "Admin Management",
    children: [
      {
        icon: null,
        link: "Account Details",
        path: "/account",
      },
      {
        icon: null,
        link: "User List",
        path: "/all-user",
      },
      {
        icon: null,
        link: "Create Admin",
        path: "/create-admin",
      },
    ],
  },
];

function AdminSideBar() {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {listItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Accordion className="w-full">
              <AccordionSummary
                expandIcon={expandIcon}
                aria-controls={"acc" + index + "content"}
                id={"acc" + index + "header"}
              >
                <div className="flex flex-row items-center justify-between w-full">
                  {item.icon || <CiCircleList />}
                  <Typography>{item.summary}</Typography>
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <List>
                  {item.children.map((child, childIndex) => (
                    <ListItem key={"child_" + childIndex} disablePadding>
                      <Link href={child.path} underline="none">
                        <div className="flex flex-row items-center justify-between w-full">
                          <span className="px-2">
                            {child.icon || <CiCircleAlert />}
                          </span>
                          <span>{child.link}</span>
                        </div>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default AdminSideBar;
