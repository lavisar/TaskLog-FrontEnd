import { Card, Grid } from "@mui/material";
import DetailsForm from "./components/profile/DetailsForm";
import ImageChange from "./components/profile/ImageChange";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import PasswordChange from "./components/profile/PasswordChange";

export default function UserProfile() {
  const selectDetails = createSelector(
    (state) => state.user.id,
    (state) => state.user.email,
    (state) => state.user.username,
    (state) => state.user.bio,
    (state) => state.user.pic,
    (state) => state.user.createdAt,
    (id, email, username, bio, pic) => ({ id, email, username, bio, pic })
  )
  const { id, email, username, bio, pic } = useSelector(selectDetails);

  return <Grid container spacing={2}>
    <Grid item sm={12} md={4}>
      <Card sx={{ minWidth: 275 }} className="!rounded-xl py-10 px-3">
        <ImageChange data={{ id, pic, username }} />
      </Card>
    </Grid>
    <Grid item sm={12} md={8}>
      <Card sx={{ minWidth: 275 }} className="!rounded-xl py-10 px-3 sx:mr-0 md:mr-10">
        <DetailsForm data={{ email, username, bio }} />
        <PasswordChange />
      </Card>
    </Grid>
  </Grid>
}