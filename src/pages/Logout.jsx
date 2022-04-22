import { Button } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Logout() {
  return (
    <div>
      <h1>Log Out Successfull</h1>
      <Link style={{ textDecoration: "none" }} to="/">
        <Button className="links" variant="contained">
          Return to HomePage
        </Button>
      </Link>
    </div>
  );
}
