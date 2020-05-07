import React, { useState, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import data from "./components/data";
import { Sidebar } from "../../../layouts/Customer/components";
import NavBar from "../../../components/Navigation/Navigation";
import { orderService } from "../../../services";
import {
  LocationInput,
  RecentLocations,
  FoodItem,
  Checkout,
} from "./components";
import Cart from "./components/Cart";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(4)
  },
}));

const CustomerCheckout = (props) => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState("");

  const handleEnter = () => {
    console.log(searchValue);
  };

  const handleLocationInput = (event) => {
    setSearchValue(event.target.value);
  };
  const [checkout, setCheckout] = useState([]);
  const [resid, setResid] = useState();

  useLayoutEffect(() => {
    console.log("removeee");
    sessionStorage.removeItem("currentTotal");
  });

  return (
    <div className={classes.root}>
      <NavBar history={props.history} />
      <Grid container spacing={6}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
        </Grid>

      <Grid container container direction="column" justify="center" alignItems="center" spacing={6} xs={12}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Grid container justify="center">
            <LocationInput
              placeholder="Enter your location"
              onChange={handleLocationInput}
            />
            <Button variant="contained" color="secondary" onClick={handleEnter}>
              Enter
            </Button>
            <Grid container justify="center">
              <Typography color="black" gutterBottom variant="h5">
                OR
              </Typography>
            </Grid>

            <RecentLocations />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Cart data={data.foodItem} resid={resid} checkout={checkout} />
          </Grid>
          <Grid container justify="center">
            <Checkout />
          </Grid>
          <Grid></Grid>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerCheckout;
