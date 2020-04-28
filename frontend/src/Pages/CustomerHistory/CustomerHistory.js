import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navigation/Navigation";
import { Sidebar } from "../../layouts/Customer/components";
import { PastOrders, TotalCustOrders, data, AddPromo } from "./components";

<<<<<<< HEAD:frontend/src/Pages/CustomerDashboard/CustomerDashboard.js
import { authenticationService } from '../../services';

class CustomerDashboard extends Component {
  state = {
    user: null
  }

  async componentWillMount() {
    await authenticationService.currentUser.subscribe((x) =>
      this.setState({
        user: x,
      }, () => {console.log('user: ', this.state.user)})
    );
  }



=======
class CustomerHistory extends Component {
  state = {};
>>>>>>> 387fcc0c47a2f3a6697f48dd61322c8419b39bf0:frontend/src/Pages/CustomerHistory/CustomerHistory.js
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />

        <Grid container spacing={6}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
          </Grid>
          <Grid container item spacing={4} id="page-wrap">
<<<<<<< HEAD:frontend/src/Pages/CustomerDashboard/CustomerDashboard.js
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <TotalCustOrders user={this.state.user}/>
=======
            <Grid container justify="center">
              <TotalCustOrders />
>>>>>>> 387fcc0c47a2f3a6697f48dd61322c8419b39bf0:frontend/src/Pages/CustomerHistory/CustomerHistory.js
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
