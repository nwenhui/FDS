import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Logout from "./Pages/Logout/Logout";
import CustomerHistory from "./Pages/Customer/CustomerHistory/CustomerHistory";
import CustomerProfile from "./Pages/Customer/CustomerProfile/CustomerProfile";
import ManagerDashboard from "./Pages/Manager/Dashboard/Dashboard";
import RiderDashboard from "./Pages/Rider/PartTimeRider/Dashboard/Dashboard";
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

import ManagerProfile from "./Pages/Manager/ManagerProfile/ManagerProfile";

import StaffProfile from "./Pages/Staff/StaffProfile/StaffProfile";

import history from "./history";
import HomePage from "./Pages/HomePage/HomePage";

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
        isRider: x && x === userType.Rider,
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
          {this.state.isRider && (
            <Route path="/dashboard" exact component={RiderDashboard} />
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

          {this.state.isManager && (
            <Route path="/dashboard" exact component={ManagerDashboard} />
          )}
          <Route path="/managerProfile" exact component={ManagerProfile} />
          {this.state.isStaff && (
            <Route path="/dashboard" exact component={StaffDashboard} />
          )}
          <Route path="/staffProfile" exact component={StaffProfile} />

          <Route path="/restaurant/search" component={RestaurantSearch} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/restaurant/signup" exact component={RestaurantSignup} />
        </Switch>
      </Router>
    );
  }
}
