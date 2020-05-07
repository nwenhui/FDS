import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import data from "./data";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import Total from './checkoutcomponents/Total'
import PaymentMethod from './checkoutcomponents/PaymentMethod'

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    // backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    // marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    // color: theme.palette.error.dark
  },
  differenceValue: {
    // color: theme.palette.error.dark,
    // marginRight: theme.spacing(1)
  },
}));

const Checkout = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState("cash");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCheckout = () => {
    let payByCash = true;

    if (value === "cash") {
      console.log(payByCash);
    } else {
      payByCash = false;
      console.log(payByCash);
    }
  };
  /*
  const totalValue = props.data;
  */

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          {/* <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Total Cost
              </Typography>
              <Typography variant="h5">{data.totalValue}</Typography>
            </Grid>
          </Grid> */}
          <Total />
          {/* <Grid item lg={6} sm={6} xl={6} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Pay by:</FormLabel>
              <RadioGroup
                aria-label="paymentMode"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash on delivery"
                />
                <FormControlLabel
                  value="creditCard"
                  control={<Radio />}
                  label="Credit Card"
                />
              </RadioGroup>
            </FormControl>
          </Grid> */}
          <PaymentMethod />
          <IconButton
            style={{ marginLeft: "200px" }}
            fullWidth={true}
            color="secondary"
            variant="outlined"
            onClick={handleCheckout}
            aria-label="Confirm Order"
          >
            Confirm Order &nbsp;
            <AddShoppingCartIcon />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
};

Checkout.propTypes = {
  className: PropTypes.string,
};

export default Checkout;
