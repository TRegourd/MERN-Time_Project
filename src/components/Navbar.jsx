import "./Navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupIcon from "@mui/icons-material/Group";
import { BrowserRouter as Router, Link } from "react-router-dom";
import LogMenu from "./LogMenu";

const Navbar = () => {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link className="links" to="/">
          <span className="logo">The Time Machine</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="topbarLinks">
          <Link className="links" to="/">
            <span className="topbarLink">
              <HomeIcon />
              <span>Homepage</span>
            </span>
          </Link>
          <Link className="links" to="/timesheet/">
            <span className="topbarLink">
              <PunchClockIcon />
              My TimeSheet
            </span>
          </Link>
          <Link className="links" to="/projects">
            <span className="topbarLink">
              <AccountTreeIcon />
              Projects
            </span>
          </Link>
          <Link className="links" to="/users">
            <span className="topbarLink">
              <GroupIcon />
              Users
            </span>
          </Link>
        </div>
      </div>
      <div className="topbarRight">
        <LogMenu />
      </div>
    </div>
  );
};

export default Navbar;
