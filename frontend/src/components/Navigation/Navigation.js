import React, { Component } from 'react';
import "./Navigation.css";

function handleErrors(response) {
  if (!response.ok) {
      throw response;
  }
  return response;
}

class Navigation extends Component {
  state = {  
    searchQuery: "",
    errorMessage: "",
    searchResult: ""
  }
  
  setSearchQuery = (event) => {
    var value = event.target.value;
    this.setState({ searchQuery: value}, () => {console.log(this.state.searchQuery)});
  }

  handleSearch(event) {
    event.preventDefault();
    const data = {search: this.state.searchQuery};
    console.log('data: ', this.state.searchQuery);
    const url = '';

    var request = new Request(url, {
      method: 'POST',
      headrs: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });

    // fetch(request)
    //   .then(handleErrors)
    //   .then((response) => {
    //     this.setState({ error: "" });
    //     response.json()
    //       .then((data) => {
    //         console.log("search donezo!!!");
    //         this.setState({ searchResult: data });
    //       })
    //   })
    //   .catch((error) => {
    //     error.text().then( errorMessage => {
    //       this.setState({ error: errorMessage}, () => {console.log('Error: ', this.state.error)});
    //     })
    //   })
  }

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
              Customers
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/About#">
              About
            </a>
          </li>
        </ul>
        <form class="form-inline" onSubmit={(e) => this.handleSearch(e)}>
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search for restaurants dgrdrdtr"
            aria-label="Search"
            onChange={this.setSearchQuery.bind(this)}
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav>
    );
  }
}
 
export default Navigation;