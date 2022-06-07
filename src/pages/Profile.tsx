import { Grid } from "@mui/material";
import React from "react";

import DisplayProfile from "../components/Profile_Components/DisplayProfile";
import LogOutSnackbar from "../components/Profile_Components/LogoutSnackbar";

export default function Profile() {
  return (
    <div>
      <Grid container spacing={1} marginTop={2} justifyContent="center">
        <DisplayProfile></DisplayProfile>
      </Grid>
    </div>
  );
}
