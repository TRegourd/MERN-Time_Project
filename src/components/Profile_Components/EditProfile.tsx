import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import services from "../../services";
import { IProfileProps, IUser } from "../../Interfaces";
import { AuthContext, AuthContextType } from "../../AuthProvider";
import { useSnackbar } from "notistack";

export default function EditProfile() {
  const { currentUser, setCurrentUser } = React.useContext(
    AuthContext
  ) as AuthContextType;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<IUser>({
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    adress: currentUser.adress,
    position: currentUser.position,
    company: currentUser.company,
    email: currentUser.email,
    _id: currentUser._id,
  });

  function updateForm(key: string, value: string) {
    setForm({ ...form, [key]: value });
  }

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    updateForm(name, value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (form.password) {
      if (form.password === form.confirmPassword) {
        services
          .updateCurrentUser(form)
          .then(async () => {
            services.getCurrentUser().then((user) => setCurrentUser(user));
            setOpen(false);
            enqueueSnackbar("Successfully Modified", { variant: "success" });
          })
          .catch(() =>
            enqueueSnackbar("Incorrect modification", { variant: "error" })
          );
      } else {
        enqueueSnackbar("Passwords not matching", { variant: "error" });
      }
    } else {
      services
        .updateCurrentUser(form)
        .then(() => {
          services.getCurrentUser().then((user) => setCurrentUser(user));
          enqueueSnackbar("Successfully Modified", { variant: "success" });
          setOpen(false);
        })
        .catch(() =>
          enqueueSnackbar("Incorrect modification", { variant: "error" })
        );
    }
  };

  React.useEffect(() => {
    setForm({
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      adress: currentUser.adress,
      position: currentUser.position,
      email: currentUser.email,
      _id: currentUser._id,
    });
  }, [currentUser]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose} onChange={handleChangeInput}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            name="first_name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={currentUser.first_name}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            name="last_name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={currentUser.last_name}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Company"
            type="text"
            name="company"
            fullWidth
            variant="standard"
            defaultValue={currentUser.company}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Position"
            type="text"
            name="position"
            fullWidth
            variant="standard"
            defaultValue={currentUser.position}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Adress"
            name="adress"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={currentUser.adress}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            name="email"
            fullWidth
            variant="standard"
            defaultValue={currentUser.email}
          />
          <TextField
            autoFocus
            margin="dense"
            label="New Paswword"
            type="password"
            name="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
