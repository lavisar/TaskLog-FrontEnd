import { Card, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import ImageChange from "../shared/profile/ImageChange";
import DetailsForm from "../shared/profile/DetailsForm";
import PasswordChange from "../shared/profile/PasswordChange";

export default function AdminProfile() {
  const selectDetails = createSelector(
    (state) => state.user.id,
    (state) => state.user.email,
    (state) => state.user.username,
    (state) => state.user.role,
    (state) => state.user.bio,
    (state) => state.user.pic,
    (state) => state.user.createdAt,
    (id, email, username, role, bio, pic) => ({ id, email, username, role, bio, pic })
  )
  const { id, email, username, role, bio, pic } = useSelector(selectDetails);


  return <Grid container spacing={2}>
    <Grid item sm={12} md={4}>
      <Card sx={{ minWidth: 275 }} className="!rounded-xl py-10 px-3">
        <ImageChange data={{ id, pic, username }} />
      </Card>
    </Grid>
    <Grid item sm={12} md={8}>
      <Card sx={{ minWidth: 275 }} className="!rounded-xl py-10 px-3 sx:mr-0 md:mr-10">
        <DetailsForm data={{ email, username, role, bio }} />
        <PasswordChange />
      </Card>
    </Grid>
  </Grid>
}