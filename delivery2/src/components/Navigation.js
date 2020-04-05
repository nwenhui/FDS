import React from "react";

function Navigation() {
  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <ul class="navbar-nav">
        <li>
          <a class="navbar-brand">Delivermeow</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Home#">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/About#">
            About
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
            Menu
            <span class="caret"></span>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdown_target">
            <button class="dropdown-item">Chinese</button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item">Japanese</button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item">Malay</button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item">Thai</button>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Orders
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Customer Service
          </a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </nav>
  );
}

export default Navigation;
