import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import NavBar from "../../../components/Navigation/Navigation";
import { Sidebar } from "../../../layouts/Customer/components";
import { PastOrders, TotalCustOrders, data, AddPromo } from "../CustomerHistory/components";
import { RewardPoints } from "../CustomerProfile/components"
import { authenticationService } from "../../../services"
import history from '../../../history';


class CustomerDashboard extends Component {
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
                <Grid container spacing={4} id="page-wrap">
                  <Grid container item spacing={4} justify="center">
                      <Grid item xs={4}>
                          <TotalCustOrders id={this.state.id}/>
                      </Grid>
                      <Grid item xs={4}>
                          <RewardPoints points={this.state.points}/>
                      </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          );
    }
}
 
export default CustomerDashboard;