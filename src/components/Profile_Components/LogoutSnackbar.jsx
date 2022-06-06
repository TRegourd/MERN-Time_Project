import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AuthContext } from "../../AuthProvider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LogOutSnackbar() {
  const [open, setOpen] = React.useState(false);
  const { disconnect } = React.useContext(AuthContext);

  const wait = () => {
    setOpen(true);

    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    });
  };

  async function handleClick() {
    await wait();
    disconnect();
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Button variant="contained" onClick={handleClick}>
        LogOut
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Successfully Logged Out !
        </Alert>
      </Snackbar>
    </Stack>
  );
}
