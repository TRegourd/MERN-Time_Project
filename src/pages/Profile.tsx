import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../AuthProvider";

import DisplayProfile from "../components/Profile_Components/DisplayProfile";
import LogOutSnackbar from "../components/Profile_Components/LogoutSnackbar";
import { IUser } from "../Interfaces";
import services from "../services";

export default function Profile() {
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="profileContainer">
      <Grid container spacing={1} marginTop={2} justifyContent="center">
        <DisplayProfile></DisplayProfile>
        <Grid container direction="row" marginTop={6} justifyContent="center">
          <Grid item xs={2}>
            <LogOutSnackbar />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
