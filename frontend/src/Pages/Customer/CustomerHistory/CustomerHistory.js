import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import NavBar from "../../../components/Navigation/Navigation";
import { Sidebar } from "../../../layouts/Customer/components";
import { PastOrders, TotalCustOrders, data, AddPromo } from "./components";
import { authenticationService } from "../../../services"


class CustomerHistory extends Component {
  state = { 
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    points: null,
    creditcard: null
  }

  componentDidMount() {
      authenticationService.currentUser.subscribe((x) => {
          if (x !== null) {
              this.setState({ id: x.id, email: x.email, firstname: x.first_name, lastname: x.last_name, points: x.points }, () => {console.log('stuff happened')})
          }
      });
  }

  render() {
    return (
      <div>
        <NavBar history={this.props.history} />

        <Grid container spacing={6}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
          </Grid>
          <Grid container item spacing={4} id="page-wrap">
            <Grid container justify="center">
              <TotalCustOrders id={this.state.id}/>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <PastOrders data={data.restaurantreview} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CustomerHistory;