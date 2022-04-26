import { Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import DisplayProfile from "../components/DisplayProfile";
import EditProfile from "../components/EditProfile";

import LogOutSnackbar from "../components/LogoutSnackbar";
import services from "../services";
import "./Profile.css";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [edit, setEdit] = useState(false);
  const { disconnect } = useContext(AuthContext);

  function fetchAndSetUserList() {
    services
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => alert("erreur"));
  }

  useEffect(() => {
    fetchAndSetUserList();
  }, []);

  return (
    <div className="profileContainer">
      <h2>My Profile</h2>
      <Grid container spacing={1} marginTop={2} justifyContent="center">
        {!edit && (
          <DisplayProfile
            currentUser={currentUser}
            edit={edit}
            setEdit={setEdit}
          ></DisplayProfile>
        )}

        {edit && (
          <EditProfile
            currentUser={currentUser}
            edit={edit}
            setEdit={setEdit}
            fetchCurrentUser={fetchAndSetUserList}
          ></EditProfile>
        )}

        <Grid container direction="row" marginTop={6} justifyContent="center">
          <Grid item xs={2}>
            <LogOutSnackbar
              className="profileItem"
              onClick={disconnect}
            ></LogOutSnackbar>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
