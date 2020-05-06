import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import About from "./Pages/About/About.js";
// import Contact from "./Contact/Contact";
// import Products from "./Product/Products";

import history from "./history";
import HomePage from "./Pages/HomePage/HomePage.js";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/Home" component={HomePage} />
          <Route path="/About" component={About} />
        </Switch>
      </Router>
    );
  }
}
