import "./Navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupIcon from "@mui/icons-material/Group";
import { BrowserRouter as Router, Link } from "react-router-dom";
import LogMenu from "./LogMenu";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";
import { Button } from "@mui/material";

const Navbar = () => {
  const { logged, setLogged } = useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link className="links" to="/">
          <span className="logo">The Time Machine</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="topbarLinks">
          {!logged && (
            <Link className="links" to="/login">
              <span className="topbarLink">
                <Button variant="contained">Get Started</Button>
              </span>
            </Link>
          )}
          {logged && (
            <Link className="links" to="/">
              <span className="topbarLink">
                <HomeIcon />
                <span>Homepage</span>
              </span>
            </Link>
          )}
          {logged && (
            <Link className="links" to="/timesheet">
              <span className="topbarLink">
                <PunchClockIcon />
                My TimeSheet
              </span>
            </Link>
          )}
          {logged && (
            <Link className="links" to="/projects">
              <span className="topbarLink">
                <AccountTreeIcon />
                Projects
              </span>
            </Link>
          )}
          {logged && (
            <Link className="links" to="/about">
              <span className="topbarLink">
                <GroupIcon />
                About Us
              </span>
            </Link>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <LogMenu />
      </div>
    </div>
  );
};

export default Navbar;
