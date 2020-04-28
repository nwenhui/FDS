import React, { useState, Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button } from "@material-ui/core";
import NavBar from "../../../components/Navigation/Navigation";
import { RestaurantReview, data } from "./components";
import { Sidebar } from "../../../layouts/Customer/components";

const EditRReview = (props) => {
  // QUERY DATA for restaurant and delivery

  return (
    <div>
      <NavBar history={props.history} />

      <Grid container item spacing={6}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
        </Grid>
        <Grid container item spacing={4} id="page-wrap">
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <RestaurantReview data={data.restaurantreview} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditRReview;
