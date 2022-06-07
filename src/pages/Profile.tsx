import { Grid } from "@mui/material";
import React from "react";
import DisplayProfile from "../components/Profile_Components/DisplayProfile";

export default function Profile() {
  return (
    <div>
      <Grid container spacing={1} marginTop={2} justifyContent="center">
        <DisplayProfile></DisplayProfile>
      </Grid>
    </div>
  );
}
