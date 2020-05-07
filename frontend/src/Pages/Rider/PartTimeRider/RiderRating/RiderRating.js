import React from "react";
import { Grid } from "@material-ui/core";
import NavBar from "../../../../components/Navigation/Navigation";
import { RatingTable, data } from "./components";
import { Sidebar } from "../../../../layouts/Customer/components";

const RiderRating = (props) => {
  // QUERY DATA for Customer promo list and delivery promo list

  return (
    <div>
      <NavBar history={props.history} />

      <Grid container item spacing={6}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
        </Grid>
        <Grid container justify="center" id="page-wrap">
          <Grid item lg={6} sm={6} xl={6} xs={6}>
            <RatingTable data={data.deliveryrating} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default RiderRating;
