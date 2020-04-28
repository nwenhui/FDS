import React, { useState, Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button } from "@material-ui/core";
import NavBar from "../../components/Navigation/Navigation";
import { Editing, RatingTable, data } from "./components";
import { Sidebar } from "../../layouts/Customer/components";

const EditDRating = (props) => {
  const [openDiv, setOpenDiv] = useState(false);

  const handleOpenDiv = () => {
    setOpenDiv(!openDiv);
  };

  // QUERY DATA for Customer promo list and delivery promo list

  return (
    <div>
      <NavBar history={props.history} />

      <Grid container item spacing={6}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
        </Grid>
        <Grid container item spacing={4} id="page-wrap">
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <RatingTable data={data.deliveryrating} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditDRating;
