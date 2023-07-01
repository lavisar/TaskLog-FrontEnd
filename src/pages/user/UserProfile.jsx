import { Card, Grid } from "@mui/material";
import DetailsForm from "./components/profile/DetailsForm";
import ImageChange from "./components/profile/ImageChange";

export default function UserProfile() {


  return <Grid container spacing={2}>
    <Grid item sm={12} md={4}>
      <Card sx={{ minWidth: 275 }} className="!rounded-xl py-10 px-3">
        <ImageChange />
      </Card>
    </Grid>
    <Grid item sm={12} md={8}>
      <Card sx={{ minWidth: 275 }} className="!rounded-xl py-10 px-3">
        <DetailsForm />
      </Card>
    </Grid>
  </Grid>
}