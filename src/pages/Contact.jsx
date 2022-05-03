import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import services from "../services";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({
    first_name: "", //currentUser.first_name,
    last_name: "", //currentUser.last_name,
    email: "", //currentUser.email,
    phone: "",
    object: "",
    message: "",
    user: "",
  });

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  function fetchAndSetUserList() {
    services
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => console.log("no user connected"));
  }

  useEffect(() => {
    fetchAndSetUserList();
  }, []);

  function updateForm(key, value) {
    setForm({ ...form, [key]: value });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    updateForm(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    services
      .createNewMessage(body)
      .then(() => {
        alert("Message Sent");
        navigate("/");
      })
      .catch(() => alert("erreur"));
    // services.updateCurrentUser(form).then(() => {});
  }

  const body = {
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    phone: form.phone,
    object: form.object,
    message: form.message,
    user: currentUser._id,
  };

  //const [firstNameValue, setFirstNameValue] = useState(currentUser.first_name);
  //   const handleChange = (event) => {
  //     setFirstNameValue(event.target.value);
  //   };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "40ch" },
      }}
      //noValidate
      onSubmit={handleSubmit}
      onChange={handleChangeInput}
      autoComplete="off"
      style={{ marginTop: "100px" }}
    >
      {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
      <div className="formContainer">
        <TextField
          id="outlined-textarea"
          label="First Name"
          placeholder="Your First Name"
          name="first_name"
          multiline
        />
        {/* {logged && (
          <TextField
            id="outlined-multiline-flexible"
            label={firstNameValue}
            multiline
            maxRows={4}
            value={firstNameValue}
            onChange={handleChange}
          />
        )} */}
        <TextField
          id="outlined-textarea"
          label="Last Name"
          placeholder="Your Last Name"
          name="last_name"
          multiline
        />
        <TextField
          id="outlined-textarea"
          label="Email"
          placeholder="email@email.com"
          type="email"
          name="email"
          multiline
        />
        <TextField
          id="outlined-textarea"
          label="Phone Number"
          placeholder="0601020304"
          type="number"
          name="phone"
          multiline
        />
        <TextField
          id="outlined-textarea"
          label="Object"
          placeholder="Object of your message to us"
          name="object"
          multiline
        />
        <TextField
          id="outlined-multiline-static"
          label="Your Message"
          multiline
          rows={6}
          placeholder="Text of your Message"
          name="message"
        />
      </div>
      <Button type="submit" variant="outlined">
        Send Message
      </Button>
    </Box>
  );
}
