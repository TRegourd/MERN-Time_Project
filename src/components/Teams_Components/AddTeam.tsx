import React, { useState, useContext, ReactComponentElement } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";

import { AuthContext, AuthContextType } from "../../AuthProvider";
import services from "../../services";
import { useSnackbar } from "notistack";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { GridContextType, GridDataContext } from "../../GridDataProvider";

export default function AddTeam(/*setTimeList: React.Dispatch<any>*/) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { getCurrentTeams } = useContext(GridDataContext) as GridContextType;
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const [form, setForm] = useState({
    name: "",
  });

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    services
      .createTeam({ ...form, user: currentUser._id })
      .then(() => {
        getCurrentTeams();
        enqueueSnackbar("Team Successfully Created", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Incorrect Entry", { variant: "error" });
      });
  };

  const updateForm = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateForm(name, value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          margin: "auto",
        }}
        variant="contained"
        onClick={handleClickOpen}
      >
        <BsFillFileEarmarkPlusFill size={30} />
        <span>Create Team</span>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        onChange={handleFormChange}
        sx={{
          "& .MuiTextField-root": { m: 1, width: 250 },
        }}
      >
        <DialogContent>
          {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
          <TextField
            id="filled-basic"
            name="name"
            label="Team Name"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="outlined">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
