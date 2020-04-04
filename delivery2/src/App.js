import React, { Component } from "react";
import "./App.css";
import Home from "./containers/HomePage/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./components/Navigation";
import { render } from "@testing-library/react";
import Footer from "./components/Footer";
import Routes from "./Route";
import { Route, NavLink, Switch } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    console.log("COMPONENT HAS MOUNTED");
  }

  addCustomers(event) {
    event.preventDefault();
    let data = {
      customer_id: this.refs.customer_id.value,
      customer_name: this.refs.customer_name.value
    };
    var request = new Request("http://localhost:3000/api/new-customer", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(data)
    });

    fetch(request).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  }

  render() {
    let title = this.state.title;
    return (
      <div className="App">
        <NavBar />
        <Routes />
        {/* <Home /> */}
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Add Customers"
          />
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Add id"
          />
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.addCustomers.bind(this)}
          >
            {" "}
            Add Customers
          </button>
        </form>

        <Footer />
      </div>
    );
  }
}

export default App;
