import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import {
  restaurantService,
  authenticationService,
} from "../../../../../services";
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../../../components/Alerts/SuccessAlert/SuccessAlert";

const useStyles = makeStyles(() => ({
  root: {},
}));

const RestaurantDetails = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [values, setValues] = useState({
    resname: "",
    min: "",
  });

  useEffect(() => {
    setValues(props);
  }, [props]);

  const [status, setStatus] = useState({
    error: false,
    success: false,
    errorMessage: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveDetails = (event) => {
    console.log("values: ", values);
    event.preventDefault();
    restaurantService
      .editRestaurant(values.resname, values.min.toString(), props.resid)
      .then((data) => {
        setStatus({
          ...status,
          success: true,
          error: false,
        });
      })
      .catch((error) => {
        console.log("err:or: ", error);
        error.text().then((errorMessage) => {
          setStatus({
            ...status,
            success: false,
            error: true,
            errorMessage: errorMessage,
          });
        });
      });
  };

  const handleDeleteRestaurant = (event) => {
    event.preventDefault();
    authenticationService
      .deleteRestaurant(props.resid)
      .then((data) => {
        setStatus({
          ...status,
          error: false,
          success: true,
        });
        const to = "/Home";
        props.history.push(to);
      })
      .catch((error) => {
        console.log("error???: ", error);
        setStatus({
          ...status,
          error: true,
          success: false,
          errorMessage: "Oops something went wrong...",
        });
      });
  };

  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form autoComplete="off" noValidate>
          <CardHeader subheader="Please edit accordingly" title="Restaurant" />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Restaurant Name"
                  margin="dense"
                  name="resname"
                  onChange={handleChange}
                  value={values.resname}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Minimum Spending"
                  margin="dense"
                  name="min"
                  onChange={handleChange}
                  value={values.min}
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  // helperText="Please specify the email"
                  label="Email"
                  margin="dense"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  margin="dense"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                />
              </Grid> */}
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSaveDetails}
            >
              Save details
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleDeleteRestaurant}
            >
              Delete Restaurant
            </Button>
          </CardActions>
        </form>
      </Card>
      {status.error && ErrorAlert(status.errorMessage)}
      {status.success && SuccessAlert("Profile successfully edited!")}
    </div>
  );
};

RestaurantDetails.propTypes = {
  className: PropTypes.string,
};

export default RestaurantDetails;
