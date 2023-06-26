import { Box, Typography } from "@mui/material";
import CustomLink from "../../components/CustomLink";

export default function SplashPage() {
  return <div>
    <Box className="flex justify-between items-center">
      <Typography>TaskLog</Typography>
      <CustomLink to="/login" className="rounded-full bg-emerald-400 px-2 py-1 text-white font-bold">
        Login
      </CustomLink>
    </Box>
  </div>;
}
