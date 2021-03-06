import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import NavBar from "../../../components/Navigation/Navigation";

import AccountDetails from "./components/AccountDetails";
import RestaurantDetails from "./components/RestaurantDetails";
import { Sidebar } from "../../../layouts/Staff/components";
import { authenticationService, restaurantService } from "../../../services";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     //padding: theme.spacing(4),
//   },
// }));

class Account extends Component {
  state = {
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    password: null,
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
            password: x.password,
          },
          () => {
            restaurantService.getRestaurant(this.state.resid).then((response) => {
              response.json()
                  .then((data) => {
                      console.log('found resty stuff hehe', data.resid);
                      this.setState({ resname: data.resname, min: data.minspending });
                  })
          })
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
          <Grid container item spacing={4} id="page-wrap">
            <Grid item lg={6} sm={6} xl={6} xs={12}></Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <AccountDetails
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                email={this.state.email}
                password={this.state.password}
                id={this.state.id}
                resid={this.state.resid}
                history={this.props.history}
              />
              <RestaurantDetails resid={this.state.resid} resname={this.state.resname} min={this.state.min} history={this.props.history} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Account;
