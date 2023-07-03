import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar1 from "./SideBar1";
import CurrentAccount from "./CurrentAccount";
import { WEBLINKS } from "../store/constants/WebLinks";
import { CustomAppBar } from "./layout/CustomAppBar";
import { CustomDrawer } from "./layout/CustomDrawer";
import { CustomDrawerHeader } from "./layout/CustomDrawerHeader";
import { FaChevronLeft } from "react-icons/fa6";

export default function Layout1() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const drawerWidth = 250;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar
        position="fixed"
        open={open}
        theme={theme}
        drawerWidth={drawerWidth}
        className="!shadow"
      >
        <Toolbar className="justify-between bg-white" variant="dense">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"
              // sx={{ ...(open && { display: "none" }) }}
              className="!text-black"
            >
              {open ? <FaChevronLeft /> : <AiOutlineMenu />}
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              className="text-black"
              sx={{ marginLeft: 5 }}
            >
              TaskLog
            </Typography>
          </div>

          <CurrentAccount profileLink={WEBLINKS.PROFILE} />
        </Toolbar>
      </CustomAppBar>

      <Box
        component="nav"
        // sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <CustomDrawer
          variant="permanent"
          open={open}
          theme={theme}
          drawerWidth={drawerWidth}
          ModalProps={{ keepMounted: true }}
          onClose={(e) => setOpen(true)}
          sx={{
            width: 0,
            minHeight: "100vh",
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: open ? drawerWidth : 0,
            },
          }}
        >
          <Toolbar>
            {/* This place is for image-------------------------- */}
          </Toolbar>

          <Divider />
          <SideBar1 open={open} />
        </CustomDrawer>

        <CustomDrawer
          variant="permanent"
          open={open}
          theme={theme}
          drawerWidth={drawerWidth}
          sx={{
            minHeight: "100vh",
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Toolbar>
            {/* This place is for image-------------------------- */}
          </Toolbar>

          <Divider />
          <SideBar1 open={open} />
        </CustomDrawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, px: 3, pt: 2 }}
        className="bg-slate-100"
      >
        <CustomDrawerHeader theme={theme} />

        {/* // MAIN CONTENT */}
        <Box sx={{}}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
