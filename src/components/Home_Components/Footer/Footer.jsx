import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import {
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsTwitter,
  BsLinkedin,
} from "react-icons/bs";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="#">How it works</Link>
            <Link to="#">Testimonials</Link>
            <Link to="#">Careers</Link>
            <Link to="#">Investors</Link>
            <Link to="#">Terms of Service</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="#">Contact</Link>
            <Link to="#">Support</Link>
            <Link to="#">Sponsorships</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Social Media</h2>
            <Link to="#">Instagram</Link>
            <Link to="#">Facebook</Link>
            <Link to="#">Youtube</Link>
            <Link to="#">Twitter</Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">The Time Machine © 2022</small>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="#"
              target="_blank"
              aria-label="Facebook"
            >
              <BsFacebook className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="#"
              target="_blank"
              aria-label="Instagram"
            >
              <BsInstagram className="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="#"
              target="_blank"
              aria-label="Youtube"
            >
              <BsYoutube className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="#"
              target="_blank"
              aria-label="Twitter"
            >
              <BsTwitter className="fab fa-twitter" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="#"
              target="_blank"
              aria-label="LinkedIn"
            >
              <BsLinkedin className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
