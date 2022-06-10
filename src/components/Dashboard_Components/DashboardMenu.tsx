import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Timesheets from "../../pages/Timesheets";
import "./DashboardMenu.css";

import { BiSitemap, BiSpreadsheet, BiPieChartAlt } from "react-icons/bi";
import { AuthContext, AuthContextType } from "../../AuthProvider";
import { AiOutlineTeam } from "react-icons/ai";

function DashboardMenu() {
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  return (
    <div className="menuContainer">
      <Link className="menuLink" to="/timesheet">
        <BiSpreadsheet className="menuLinkLogo" />
        <span>My Timesheets</span>
      </Link>
      <Link className="menuLink" to="/projects">
        <BiSitemap className="menuLinkLogo" />
        <span>My Projects</span>
      </Link>
      <Link className="menuLink" to="/report">
        <BiPieChartAlt className="menuLinkLogo" />
        <span>My Report</span>
      </Link>

      <Link className="menuLink" to="/teams">
        <AiOutlineTeam className="menuLinkLogo" />
        <span>My Teams</span>
      </Link>
    </div>
  );
}

export default DashboardMenu;
