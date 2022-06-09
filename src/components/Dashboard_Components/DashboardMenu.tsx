import React from "react";
import { Link } from "react-router-dom";
import Timesheets from "../../pages/Timesheets";
import "./DashboardMenu.css";

import { BiSitemap, BiSpreadsheet, BiPieChartAlt } from "react-icons/bi";

function DashboardMenu() {
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
    </div>
  );
}

export default DashboardMenu;
