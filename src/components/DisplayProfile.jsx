import { Button } from "@mui/material";
import React from "react";
import { Item } from "../components/Item";

export default function DisplayProfile({ currentUser, edit, setEdit }) {
  function handleClick() {
    setEdit(true);
  }

  return (
    <div>
      <Item className="profileItem">First Name : {currentUser.first_name}</Item>
      <Item className="profileItem">Last Name : {currentUser.last_name}</Item>
      <Item className="profileItem">Adress : </Item>
      <Item className="profileItem">Position : </Item>

      <Button onClick={handleClick} className="profileItem" variant="contained">
        Edit Profile
      </Button>
    </div>
  );
}
