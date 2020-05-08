import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Staff/components";
import { List, data } from "./components";
import { authenticationService, restaurantService } from "../../../../services"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const RestaurantReview = (props) => {
  const classes = useStyles();

  const [orders] = useState(props.order)
  // const [items, setItems] = useState([])

  // useEffect(() => {
  //   restaurantService.getOrderItems(orders).then((response) => {
  //     response.json().then((data) => {
  //       setItems(restaurantService.orderItemResults(data));
  //     })
  //   })
  // })

  return (
    <div className={classes.root}>
      <Grid container item spacing={4}>
        <Grid item lg={12} sm={10} xl={12} xs={12}>
          
            <List />
          
          
        </Grid>
      </Grid>
    </div>
  );
};

class Review extends Component {
  state = {
    id: null,
    orders: []
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
              {/* {this.state.orders.map((order) => ( */}
                <RestaurantReview />
              {/* ))} */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Review;
