import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import data from "./components/data";
import { Sidebar } from "../../../layouts/Customer/components";
import NavBar from "../../../components/Navigation/Navigation";

import { FoodItem, Total } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(4)
  },
}));

const CustomerCheckout = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar history={props.history} />
      <Grid container spacing={6}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
        </Grid>
        <Grid container item spacing={4} id="page-wrap">
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <FoodItem data={data.foodItem} />
            {/*<FoodItem data={checkoutList.foodItem} />*/}
          </Grid>
          <Grid container justify="center">
            <Total />
          </Grid>
          <Grid></Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerCheckout;
