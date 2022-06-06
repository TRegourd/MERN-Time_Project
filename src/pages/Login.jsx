import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import services from "../services";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export default function Login() {
  const { setLogged } = useContext(AuthContext);
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    services
      .login(body)
      .then((result) => {
        const { jwt } = result.data;
        localStorage.setItem("jwt", jwt);
        setLogged(true);
        alert("successfully logged");
        navigate("/");
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
      style={{ marginTop: "100px" }}
    >
      <h1>Login</h1>
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
      <br />
      <div className="signinToLoginLink" style={{ marginTop: "10px" }}>
        Dont' have account yet ? <Link to="/signin">{"Sign in"}</Link>
      </div>
    </Box>
  );
}
