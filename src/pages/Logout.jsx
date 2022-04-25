import { Button, Alert, AlertTitle } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Logout() {
  return (
    <div style={{ marginTop: "100px" }}>
      <Alert severity="success" style={{ justifyContent: "center" }}>
        <AlertTitle>LogOut Successfull</AlertTitle>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button className="links" variant="contained">
            Return to HomePage
          </Button>
        </Link>
      </Alert>
    </div>
  );
}
