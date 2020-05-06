import React from "react";
import { push as Menu } from "react-burger-menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import RateReviewIcon from "@material-ui/icons/RateReview";
import GradeIcon from "@material-ui/icons/Grade";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Promotion from "@material-ui/icons/MoneyOffRounded";
import Salary from "@material-ui/icons/LocalAtmRounded";
import DeliveryFee from "@material-ui/icons/CreditCardRounded";
import MonthlySummary from "@material-ui/icons/AssignmentRounded";
import DeliverySummary from "@material-ui/icons/LocalMallRounded";
import RiderSummary from "@material-ui/icons/DirectionsBikeRounded";

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
      <a className="menu-item" href="/ManagerPromo">
        <Promotion /> Promotions
      </a>
      <a className="menu-item" href="/riderSalary">
        <Salary /> Salary
      </a>
      <a className="menu-item" href="/deliveryFee">
        <DeliveryFee /> Delivery Fee
      </a>

      <a className="menu-item" href="/customerHistory">
        <MonthlySummary /> Monthly Summary
      </a>
      <a className="menu-item" href="/customerHistory">
        <DeliverySummary /> Delivery Summary
      </a>
      <a className="menu-item" href="/EditRReview">
        <RiderSummary /> Rider Summary
      </a>
    </Menu>
  );
};
