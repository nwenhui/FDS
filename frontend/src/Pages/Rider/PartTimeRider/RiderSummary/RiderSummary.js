import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import NavBar from "../../../../components/Navigation/Navigation";

import { Sidebar } from "../../../../layouts/Rider/components";
import SummaryDetails from "./components/SummaryDetails";

class RiderSummary extends Component {
  //   state = {
  //     id: null,
  //     email: null,
  //     firstname: null,
  //     lastname: null,
  //     password: null,
  //   };

  //   componentDidMount() {
  //     authenticationService.currentUser.subscribe((x) => {
  //       console.log("omo", x);
  //       if (x !== null) {
  //         this.setState(
  //           {
  //             id: x.id,
  //             email: x.email,
  //             firstname: x.first_name,
  //             lastname: x.last_name,
  //             password: x.password,
  //           },
  //           () => {
  //             console.log("weewoo");
  //           }
  //         );
  //       }
  //     });
  //   }

  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <Grid container spacing={6}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
          </Grid>
          <Grid container item spacing={4} id="page-wrap">
            <Grid container item spacing={4} justify="center">
              <SummaryDetails />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default RiderSummary;
