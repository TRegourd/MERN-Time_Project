import React, { useState, useEffect, useContext } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from "../../AuthProvider";
import Logo from "../../assets/stopwatch.png";

function Navbar() {
  const { logged } = useContext(AuthContext); // as AuthContextType;
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link className="logoContainer" to="/" onClick={closeMobileMenu}>
            <img className="logo" src={Logo} alt="Logo All-in-QR" />
            <span className="text-logo">The Time Machine</span>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <GiHamburgerMenu />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {logged && (
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {logged && (
              <li className="nav-item">
                <Link
                  to="/profilePage"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
            )}

            {!logged && (
              <li>
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up as Pro
                </Link>
              </li>
            )}
          </ul>
          {button && !logged && (
            <Button buttonStyle="btn--outline">SIGN UP</Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
