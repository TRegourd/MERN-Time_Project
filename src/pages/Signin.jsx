import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import services from "../services";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
  const [body, setBody] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(body);
    services
      .signin(body)
      .then(() => {
        alert("user successfully created");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect entry");
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
      <h1>Sign In</h1>
      <div>
        <TextField
          required
          id="outlined-first_name-required"
          label="First Name"
          type="text"
          name="first_name"
        />
        <TextField
          required
          id="outlined-last_name-required"
          label="Last Name"
          type="text"
          name="last_name"
        />
        <TextField
          required
          id="outlined-email-required"
          label="Email"
          type="email"
          name="email"
        />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />
        <TextField
          id="outlined-confirmPassword-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          name="confirmPassword"
        />
      </div>
      <Button type="submit" variant="outlined">
        Sign In
      </Button>
      <br />
      <div className="signinToLoginLink" style={{ marginTop: "10px" }}>
        Already have an account ? <Link to="/login">{"LogIn"}</Link>
      </div>
    </Box>
  );
}
