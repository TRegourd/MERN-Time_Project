import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Item } from "../components/Item";
import services from "../services";
import "./Profile.css";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState({});

  function fetchAndSetUserList() {
    services
      .getCurrentUser()
      .then((user) => {
        console.log(user);
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
      <Item className="profileItem">{currentUser.first_name}</Item>
      <Item className="profileItem">{currentUser.last_name}</Item>
    </div>
  );
}
