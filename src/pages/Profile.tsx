import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import DisplayProfile from "../components/Profile_Components/DisplayProfile";
import LogOutSnackbar from "../components/Profile_Components/LogoutSnackbar";
import { IUser } from "../Interfaces";
import services from "../services";
import "./Profile.css";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState<IUser>();

  function fetchAndSetCurrentUser() {
    services
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => alert("erreur"));
  }

  useEffect(() => {
    fetchAndSetCurrentUser();
  }, []);

  return (
    <div className="profileContainer">
      <Grid container spacing={1} marginTop={2} justifyContent="center">
        {currentUser && (
          <DisplayProfile
            currentUser={currentUser}
            fetchAndSetCurrentUser={fetchAndSetCurrentUser}
          ></DisplayProfile>
        )}

        <Grid container direction="row" marginTop={6} justifyContent="center">
          <Grid item xs={2}>
            <LogOutSnackbar />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
