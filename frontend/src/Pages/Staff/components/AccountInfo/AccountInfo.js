import React, { Component, useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { authenticationService } from "../../../../services";

import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
} from "@material-ui/core";

class AccountInfo extends Component {
  state = {
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    resid: null,
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
            console.log("stuff happened");
          }
        );
      }
    });
  }

  render() {
    return (
      <Card>
        <form autoComplete="off" noValidate>
          <CardHeader title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              {/* <Grid item md={6} xs={12}>
              <CardContent
                fullWidth
                name="firstname"
                // onChange={handleChange}
                value={values.firstname}
                variant="outlined"
              />
            </Grid> */}
              <Grid item md={12} xs={12}>
                <Typography variant="h6" component="h2">
                  Name: {this.state.firstname} {this.state.lastname}
                </Typography>
              </Grid>

              <Grid item md={12} xs={12}>
                <Typography variant="h6" component="h2">
                  Email: {this.state.email}
                </Typography>
              </Grid>

              <Grid item md={12} xs={12}>
                <Typography variant="h6" component="h2">
                  RestaurantID: {this.state.resid}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </form>
      </Card>
    );
  }
}

AccountInfo.propTypes = {
  className: PropTypes.string,
};

export default AccountInfo;
