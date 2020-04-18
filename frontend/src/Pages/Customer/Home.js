import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navigation/Navigation";
import { Sidebar } from "../../layouts/Customer/components";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />

        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
        <div id="page-wrap">
          <p>u issa customer</p>
        </div>
      </div>
    );
  }
}

export default Home;
