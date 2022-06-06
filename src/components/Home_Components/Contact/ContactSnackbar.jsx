import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import services from "../../../services";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ContactSnackbar({ body }) {
  const [open, setOpen] = React.useState(false);
  const [signed, setSigned] = React.useState(false);

  const navigate = useNavigate();

  const wait = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    });
  };

  async function handleClick() {
    services
      .createNewMessage(body)
      .then(() => {
        setSigned(true);
        snackBarTrue();
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  }

  async function snackBarTrue() {
    setOpen(true);
    await wait();
    navigate("/");
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack>
      <Button
        style={{
          alignSelf: "center",
          backgroundColor: "black",
          color: "white",
        }}
        variant="contained"
        onClick={handleClick}
      >
        Send
      </Button>
      {signed && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Message Sent !
          </Alert>
        </Snackbar>
      )}
      {!signed && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Incorrect Entry !
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}
