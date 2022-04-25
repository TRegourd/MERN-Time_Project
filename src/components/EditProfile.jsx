import { Button, TextField } from "@mui/material";
import React from "react";
import { Item } from "./Item";

export default function EditProfile({ currentUser, edit, setEdit }) {
  function handleClick() {
    setEdit(false);
  }

  return (
    <div>
      <Item>
        First Name :{" "}
        <TextField
          className="profileItem"
          defaultValue={currentUser.first_name}
          placeholder={currentUser.first_name}
        ></TextField>
      </Item>
      <Item>
        Last Name :{" "}
        <TextField
          className="profileItem"
          defaultValue={currentUser.last_name}
          placeholder={currentUser.last_name}
        ></TextField>
      </Item>
      <Item>
        Adress : <TextField className="profileItem"></TextField>
      </Item>
      <Item>
        Position : <TextField className="profileItem"></TextField>
      </Item>
      <br />
      <Button onClick={handleClick} className="profileItem" variant="contained">
        Save Modifications
      </Button>
    </div>
  );
}
