import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

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
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

const TotalCustOrders = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const totalCustOrders = 20;

  /**** Fetch the total number of orders for the customer

  const url = 'api/v1/...';
  let totalCustOrders = 0;

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    totalCustOrders = result;
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOTAL NUMBER OF ORDERS
            </Typography>
            <Typography variant="h3">{totalCustOrders}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ShoppingCartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCustOrders.propTypes = {
  className: PropTypes.string,
};

export default TotalCustOrders;
