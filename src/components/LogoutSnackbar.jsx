import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AuthContext } from "../AuthProvider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LogOutSnackbar() {
  const [open, setOpen] = React.useState(false);
  const { disconnect } = React.useContext(AuthContext);

  const handleClick = () => {
    setOpen(true);

    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 3000);
    });
  };

  async function asyncCall() {
    console.log("calling");
    const result = await handleClick();
    if (result) {
      disconnect();
    }
  }

  //   React.useEffect(() => {
  //     asyncCall();
  //   }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }} justifyContent="center">
      <Button variant="outlined" onClick={handleClick}>
        LogOut
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully Logged Out !
        </Alert>
      </Snackbar>
    </Stack>
  );
}
