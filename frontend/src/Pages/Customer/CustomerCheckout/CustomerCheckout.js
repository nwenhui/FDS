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
import AddressInput from "./AddressInput"
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
    // setSearchValue(event.target.value);
    orderService.setLocation(event.target.value);
    console.log('locato:', orderService.locationSubjectValue);
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
          {/* <Grid container direction="row" justify="center" alignItems="center">
            <LocationInput
              value={orderService.locationSubjectValue}
              placeholder="Enter Delivery Address"
              onChange={(e) => handleLocationInput(e)}
            />
            
            <Grid container justify="center">
              <Typography color="black" gutterBottom variant="h6">
                OR
              </Typography>
            </Grid>

            <RecentLocations />
          </Grid> */}
          <AddressInput />
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
