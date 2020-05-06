import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import NavBar from "../../../components/Navigation/Navigation";
import { Sidebar } from "../../../layouts/Staff/components";
import Typography from "@material-ui/core/Typography";
import AccountInfo from "../components/AccountInfo";

import { authenticationService, restaurantService } from "../../../services";
import history from "../../../history";

class StaffDashboard extends Component {
  state = {
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    resid: null,
    resname: null,
    min: null,
  };

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) => {
      if (x !== null) {
        this.setState(
          {
            id: x.id,
            email: x.email,
            firstname: x.first_name,
            lastname: x.last_name,
            resid: x.restaurantid,
          },
          () => {
            restaurantService
              .getRestaurant(this.state.resid)
              .then((response) => {
                response.json().then((data) => {
                  console.log("found resty stuff hehe", data.resid);
                  this.setState({
                    resname: data.resname,
                    min: data.minspending,
                  });
                });
              });
            console.log("stuff happened");
          }
        );
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
          <Grid container spacing={4} id="page-wrap">
            <Grid container item spacing={4} justify="center">
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
              >
                {" "}
                <Typography variant="h4" component="h2">
                  Welcome back, {this.state.firstname} ! :){" "}
                </Typography>{" "}
              </Grid>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
              >
                {" "}
                <AccountInfo />
              </Grid>
              {/* <Grid item xs={4}>
                <RewardPoints points={this.state.points} />
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default StaffDashboard;
