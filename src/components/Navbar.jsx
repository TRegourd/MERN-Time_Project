import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
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
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link className="links" to="/timesheet/">
            <span className="topbarLink">My TimeSheet</span>
          </Link>
          <Link className="links" to="/projects">
            <span className="topbarLink">Projects</span>
          </Link>
          <Link className="links" to="/users">
            <span className="topbarLink">Users</span>
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
