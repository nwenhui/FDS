import React from "react";
import { push as Menu } from "react-burger-menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import RateReviewIcon from "@material-ui/icons/RateReview";
import GradeIcon from "@material-ui/icons/Grade";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";

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
    color: "#038162",
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

      <a className="menu-item" href="/managerProfile">
        <SettingsIcon /> Edit Profile
      </a>

      {/* <a className="menu-item" href="/customerHistory">
        <HistoryIcon /> Past Orders
      </a>
      <a className="menu-item" href="/EditRReview">
        <RateReviewIcon /> Restaurant Reviews
      </a>

      <a className="menu-item" href="/EditDRating">
        <GradeIcon /> Rider Ratings
      </a>

      <a className="menu-item" >
        <ShoppingCartIcon /> Check Out
      </a> */}
    </Menu>
  );
};
