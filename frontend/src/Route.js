import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Logout from "./Pages/Logout/Logout";
import CustomerHistory from "./Pages/Customer/CustomerHistory/CustomerHistory";
import CustomerProfile from "./Pages/Customer/CustomerProfile/CustomerProfile";
import ManagerDashboard from "./Pages/Manager/Dashboard/Dashboard";
import PartTimeRiderDashboard from "./Pages/Rider/PartTimeRider/Dashboard/Dashboard";
import FullTimeRiderDashboard from "./Pages/Rider/FullTimeRider/Dashboard/Dashboard";

import StaffDashboard from "./Pages/Staff/Dashboard/Dashboard";
import RestaurantSearch from "./Pages/SearchResult/SearchResult";
import RestaurantSignup from "./Pages/Signup/RestaurantSignup/RestaurantSignup";

import EditRReview from "./Pages/Customer/EditRReview/EditRReview";
import EditDRating from "./Pages/Customer/EditDRating/EditDRating";

import CustomerDashboard from "./Pages/Customer/Dashboard/Dashboard";
import PartTimeRiderProfile from "./Pages/Rider/PartTimeRider/RiderProfile/RiderProfile";
import PartTimeRiderHistory from "./Pages/Rider/PartTimeRider/RiderHistory/RiderHistory";
import PartTimeRiderSched from "./Pages/Rider/PartTimeRider/RiderSubmitSched/RiderSubmitSched";
import PartTimeRiderSummary from "./Pages/Rider/PartTimeRider/RiderSummary/RiderSummary";
import FullTimeRiderSummary from "./Pages/Rider/FullTimeRider/RiderSummary/RiderSummary";
import FullTimeRiderProfile from "./Pages/Rider/FullTimeRider/RiderProfile/RiderProfile";
import FullTimeRiderHistory from "./Pages/Rider/FullTimeRider/RiderHistory/RiderHistory";

import ManagerProfile from "./Pages/Manager/ManagerProfile/ManagerProfile";

import StaffProfile from "./Pages/Staff/StaffProfile/StaffProfile";
import StaffPromotions from "./Pages/Staff/components/Promotions";
import AddPromos from "./Pages/Customer/CustomerHistory/components/AddPromo";

import history from "./history";
import HomePage from "./Pages/HomePage/HomePage";

import CustomerMenu from "./Pages/Restaurant/CustomerMenu/CustomerMenu";
import OtherMenu from "./Pages/Restaurant/OtherMenu/OtherMenu";

import { authenticationService } from "./services";
import { userType } from "./helpers";

export default class Routes extends Component {
  state = {
    currentUser: null,
    isCustomer: false,
    isStaff: false,
    isRider: false,
    isManager: false,
  };

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({
        currentUser: x,
      })
    );
    authenticationService.currentUserType.subscribe((x) =>
      this.setState({
        isCustomer: x && x === userType.Customer,
        isStaff: x && x === userType.Staff,
        isPTRider: x && x === userType.PTRider,
        isFTRider: x && x === userType.FTRider,
        isManager: x && x === userType.Manager,
      })
    );
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" exact component={HomePage} />
          <Route path="/Home" component={HomePage} />
          {/* <Route path="/About" component={About} /> */}
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          {this.state.isCustomer && (
            <Route path="/dashboard" exact component={CustomerDashboard} />
          )}
          <Route path="/customerHistory" exact component={CustomerHistory} />
          <Route path="/customerProfile" exact component={CustomerProfile} />
          <Route path="/EditRReview" exact component={EditRReview} />
          <Route path="/EditDRating" exact component={EditDRating} />
          {this.state.isPTRider && (
            <Route path="/dashboard" exact component={PartTimeRiderDashboard} />
          )}
          <Route
            path="/partTimeProfile"
            exact
            component={PartTimeRiderProfile}
          />
          <Route
            path="/partTimeHistory"
            exact
            component={PartTimeRiderHistory}
          />
          <Route path="/partTimeSched" exact component={PartTimeRiderSched} />
          <Route
            path="/partTimeSummary"
            exact
            component={PartTimeRiderSummary}
          />
          {this.state.isFTRider && (
            <Route path="/dashboard" exact component={FullTimeRiderDashboard} />
          )}
          <Route
            path="/fullTimeProfile"
            exact
            component={FullTimeRiderProfile}
          />
          <Route
            path="/fullTimeHistory"
            exact
            component={FullTimeRiderHistory}
          />

          {/* <Route path="/partTimeSched" 
          exact 
          component={PartTimeRiderSched} /> */}

          <Route
            path="/fullTimeSummary"
            exact
            component={FullTimeRiderSummary}
          />

          {this.state.isManager && (
            <Route path="/dashboard" exact component={ManagerDashboard} />
          )}
          <Route path="/managerProfile" exact component={ManagerProfile} />
          {this.state.isStaff && (
            <Route path="/dashboard" exact component={StaffDashboard} />
          )}
          <Route path="/staffProfile" exact component={StaffProfile} />
          <Route path="/staffPromotions" exact component={StaffPromotions} />
          <Route path="/AddPromos" exact component={AddPromos} />

          <Route path="/restaurant/search" component={RestaurantSearch} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/restaurant/signup" exact component={RestaurantSignup} />
          {this.state.isCustomer && <Route path="/restaurant/menu" component={CustomerMenu} />}
          {!this.state.isCustomer && <Route path="/restaurant/menu" component={OtherMenu} />}
        </Switch>
      </Router>
    );
  }
}
