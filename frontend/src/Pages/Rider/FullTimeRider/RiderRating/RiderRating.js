import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/RiderPT/components";
import { PastOrders, TotalCustOrders, data, AddPromo } from "./components";
import { authenticationService, customerService, riderService } from "../../../../services"


class RiderRating extends Component {
  state = { 
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    points: null,
    creditcard: null,
    orders: []
  }

  componentDidMount() {
      riderService.getrates(authenticationService.currentUserValue.id).then((response) => {
        response.json().then((data) => {
          console.log("hello", data);
          this.setState({orders: data})
        })
      })
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
            {/* <Grid container justify="center">
              <TotalCustOrders id={this.state.id}/>
            </Grid> */}
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <PastOrders data={data.restaurantreview} orders={this.state.orders} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default RiderRating;