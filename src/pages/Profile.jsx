import { Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Item } from "../components/Item";
import LogOutSnackbar from "../components/LogoutSnackbar";
import services from "../services";
import "./Profile.css";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState({});
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
      <h1>My Profile</h1>
      <Item className="profileItem">First Name : {currentUser.first_name}</Item>
      <Item className="profileItem">Last Name : {currentUser.last_name}</Item>
      <Item className="profileItem">Adress : </Item>
      <Item className="profileItem">Position : </Item>

      <Button className="profileItem" onClick={disconnect} variant="contained">
        Edit Password
      </Button>
      {/* 
      <LogOutSnackbar
        className="profileItem"
        onClick={disconnect}
      ></LogOutSnackbar> */}
    </div>
  );
}
