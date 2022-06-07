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

export default function EditProfile() {
  const { currentUser, setCurrentUser } = React.useContext(
    AuthContext
  ) as AuthContextType;
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<IUser>({
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    adress: currentUser.adress,
    position: currentUser.position,
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
    services
      .updateCurrentUser(form)
      .then(() => {
        services.getCurrentUser().then((user) => setCurrentUser(user));
        setOpen(false);
      })
      .catch(() => alert("erreur"));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose} onChange={handleChangeInput}>
        <DialogTitle>Edit My Profile</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
