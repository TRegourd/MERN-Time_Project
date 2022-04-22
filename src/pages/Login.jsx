import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import services from "../services";

export default function Login() {
  let body = { email: "marrington3@youtube.com", password: "dQHYdc3rBZX" };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(body);
    services
      .login(body)
      .then(() => {})
      .catch((err) => {
        console.log(err);
        alert("oups");
      });
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1>Login</h1>
      <div>
        <TextField
          required
          id="outlined-email-required"
          label="Email"
          type="email"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" variant="outlined">
        Login
      </Button>
    </Box>
  );
}
