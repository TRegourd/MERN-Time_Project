import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import services from "../services";
import { useState } from "react";

export default function Login() {
  //let body = { email: "marrington3@youtube.com", password: "dQHYdc3rBZX" };

  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(body);
    services
      .login(body)
      .then(() => {
        alert("logged");
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect login");
      });
  }

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    updateBody(name, value);
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
      onChange={handleChange}
    >
      <h1>Login</h1>
      <pre>{JSON.stringify(body, null, 2)}</pre>
      <div>
        <TextField
          required
          id="outlined-email-required"
          label="Email"
          type="email"
          name="email"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />
      </div>
      <Button type="submit" variant="outlined">
        Login
      </Button>
    </Box>
  );
}
