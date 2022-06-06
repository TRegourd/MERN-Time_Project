import React from "react";
import "./HomeHeader.css";
import Link from "react-scroll/modules/components/Link";
import { Link as RouterLink } from "react-router-dom";
import HomeVideo from "../../../assets/video.mp4";
import { Button } from "@mui/material";
import BgImage from "../../../assets/backgroundEvents.jpeg";

export default function HomeHeader() {
  return (
    <div className="header-container">
      <img className="bg-image" src={BgImage}></img>

      <h1>The Time Machine</h1>
      <p>Keep track of your time</p>
      <div className="header-btns">
        <Button className="btns"></Button>
        <RouterLink to="/login">
          <Button className="btns contained" variant="contained">
            Get Started
          </Button>
        </RouterLink>
        <Link to="contact" smooth>
          <Button className="btns outlined" variant="outlined">
            CONTACT US
          </Button>
        </Link>
      </div>
    </div>
  );
}
