import React from "react";
import { push as Menu } from "react-burger-menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import ScheduleIcon from "@material-ui/icons/Schedule";
import InsertChartIcon from "@material-ui/icons/InsertChart";
var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "23px",
    height: "15px",
    left: "25px",
    top: "80px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.3em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
  },
  bmItem: {
    color: "#ffa8b6",
    display: "block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

export default (props) => {
  return (
    <Menu {...props} styles={styles}>
      <a className="menu-item" href="/dashboard">
        <DashboardIcon /> Dashboard
      </a>
      <a className="menu-item" href="/fullTimeProfile">
        <SettingsIcon /> Edit Profile
      </a>
      <a className="menu-item" href="/fullTimeSched">
        <ScheduleIcon /> Submit Schedule
      </a>

      <a className="menu-item" href="/fullTimeHistory">
        <HistoryIcon /> Past Work
      </a>
      <a className="menu-item" href="/fullTimeSummary">
        <InsertChartIcon /> Summary
      </a>
    </Menu>
  );
};
