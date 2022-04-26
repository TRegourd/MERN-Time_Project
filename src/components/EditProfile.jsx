import { Box, Button, TextField, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import services from "../services";
import { Item } from "./Item";

export default function EditProfile({
  currentUser,
  fetchCurrentUser,
  edit,
  setEdit,
}) {
  const [form, setForm] = useState({
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    adress: currentUser.adress,
    position: currentUser.position,
  });

  function updateForm(key, value) {
    setForm({ ...form, [key]: value });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    updateForm(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    services.updateCurrentUser(form);
    // setForm(form);
    setEdit(false);
    fetchCurrentUser();
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        onChange={handleChangeInput}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Item>
          First Name :{" "}
          <TextField
            className="profileItem"
            defaultValue={currentUser.first_name}
            placeholder={currentUser.first_name}
            name="first_name"
          ></TextField>
        </Item>
        <Item>
          Last Name :{" "}
          <TextField
            className="profileItem"
            defaultValue={currentUser.last_name}
            placeholder={currentUser.last_name}
            name="last_name"
          ></TextField>
        </Item>
        <Item>
          Adress :{" "}
          <TextField
            className="profileItem"
            defaultValue={currentUser.adress}
            placeholder={currentUser.adress}
            name="adress"
          ></TextField>
        </Item>
        <Item>
          Position :{" "}
          <TextField
            className="profileItem"
            defaultValue={currentUser.position}
            placeholder={currentUser.position}
            name="position"
          ></TextField>
        </Item>
        <br />
        <Button type="submit" className="profileItem" variant="contained">
          Save Modifications
        </Button>
      </Box>
    </div>
  );
}
