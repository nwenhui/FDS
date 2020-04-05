import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import CustomerHome from "./views/Customer/Home";
import ManagerHome from "./views/Manager/Home";
import RiderHome from "./views/Rider/Home";
import StaffHome from "./views/Staff/Home";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/customer/home" exact component = {CustomerHome} />
          <Route path="/rider/home" exact component = {RiderHome} />
          <Route path="/manager/home" exact component = {ManagerHome} />
          <Route path="/staff/home" exact component = {StaffHome} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
