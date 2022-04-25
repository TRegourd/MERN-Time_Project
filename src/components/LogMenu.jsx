import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "./Navbar.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function LogMenu({ logged, setLogged }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function disconnect() {
    setLogged(false);
    localStorage.removeItem("logged");
    localStorage.removeItem("jwt");
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountBoxIcon className="links" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {logged && (
          <MenuItem onClick={handleClose}>
            <Link className="menuLinks" to="/profilePage">
              Profile
            </Link>
          </MenuItem>
        )}
        {!logged && (
          <MenuItem onClick={handleClose}>
            <Link className="menuLinks" to="/login">
              <Button variant="outlined" onClick={handleClick}>
                Log In
              </Button>
            </Link>
          </MenuItem>
        )}
        {logged && (
          <MenuItem
            onClick={() => {
              handleClose();
              disconnect();
            }}
          >
            <Link className="menuLinks" to="/logout">
              <Button variant="outlined" onClick={handleClick}>
                Log Out
              </Button>
            </Link>
          </MenuItem>
        )}
        {!logged && (
          <MenuItem onClick={handleClose}>
            <Link className="menuLinks" to="/signin">
              <Button variant="outlined" onClick={handleClick}>
                Sign In
              </Button>
            </Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
