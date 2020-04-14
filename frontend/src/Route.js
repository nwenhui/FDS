import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import About from './Pages/About/About';
// import Contact from "./Contact/Contact";
// import Products from "./Product/Products";
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import CustomerHome from "./Pages/Customer/Home";
import ManagerHome from "./Pages/Manager/Home";
import RiderHome from "./Pages/Rider/Home";
import StaffHome from "./Pages/Staff/Home";
import RestaurantSearch from './Pages/SearchResult/SearchResult';

import history from "./history";
import HomePage from './Pages/HomePage/HomePage';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/Home" component={HomePage} />
          <Route path="/About" component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/customer/home" exact component = {CustomerHome} />
          <Route path="/rider/home" exact component = {RiderHome} />
          <Route path="/manager/home" exact component = {ManagerHome} />
          <Route path="/staff/home" exact component = {StaffHome} />
          <Route path="/restaurant/search" component = {RestaurantSearch} />
        </Switch>
      </Router>
    );
  }
}
