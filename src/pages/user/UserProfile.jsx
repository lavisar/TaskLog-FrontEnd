import { Card } from "@mui/material";
import DetailsForm from "./components/profile/DetailsForm";

export default function UserProfile() {
  

  return <div>
    <Card sx={{ minWidth: 275 }} className="!rounded-xl py-10 px-3 mx-20">
      <DetailsForm/>
    </Card>
  </div>
}