import { Grid, Button } from "@mui/material";
import React from "react";
import { Item } from "../components/Item";

export default function DisplayProfile({ currentUser, edit, setEdit }) {
  function handleClick() {
    setEdit(true);
  }

  return (
    <div>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Item className="profileItem">
          First Name : <span>{currentUser.first_name}</span>
        </Item>
        <Item className="profileItem" xs={4}>
          Last Name : <span>{currentUser.last_name}</span>
        </Item>
      </Grid>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Item className="profileItem">
          Adress : <span>{currentUser.adress}</span>
        </Item>
      </Grid>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Item className="profileItem">
          Position : <span>{currentUser.position}</span>
        </Item>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent="center"
        marginTop={2}
      >
        <Button
          onClick={handleClick}
          className="profileItem"
          variant="contained"
        >
          Edit Profile
        </Button>
      </Grid>
    </div>
  );
}
