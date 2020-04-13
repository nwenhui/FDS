import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Navigation.css";
import Searchbar from './Searchbar/Searchbar';

class Navigation extends Component {
  render() { 
    return (
      <nav class="navbar navbar-expand-md navbar-dark bg-dark justify-content-between">
        <ul class="navbar-nav">
          <li>
            <a class="navbar-brand">Delivermeow</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Home#">
              Home
            </a>
          </li>
  
          <li></li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              data-target="dropdown_target"
              href="#"
            >
              Join us
              <span class="caret"></span>
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdown_target">
              <Link to="/signup">
                <button class="dropdown-item">User</button>
              </Link>
              <div class="dropdown-divider"></div>
              <Link to="/restaurant/signup">
                <button class="dropdown-item">Restaurant</button>
              </Link>
              <div class="dropdown-divider"></div>
              {/* <button class="dropdown-item">Malay</button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item">Thai</button> */}
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Orders
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Customers
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/About#">
              About
            </a>
          </li>
        </ul>
        <Searchbar history={this.props.history}/>
      </nav>
    );
  }
}
 
export default Navigation;