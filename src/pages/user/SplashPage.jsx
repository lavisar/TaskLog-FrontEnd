import { Box, Typography } from "@mui/material";
import CustomLink from "../../components/CustomLink";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { useEffect } from "react";

export default function SplashPage() {
  useEffect(() => {
    document.title = "TaskLog"
  }, []);
  return <div>
    <Box className="flex justify-between items-center">
      <Typography>TaskLog</Typography>
      <CustomLink to={WEBLINKS.LOGIN} className="rounded-full bg-emerald-400 px-2 py-1 text-white font-bold">
        Login
      </CustomLink>
    </Box>
  </div>;
}
