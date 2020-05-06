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
import { authenticationService } from "../../../../../services";
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../../../components/Alerts/SuccessAlert/SuccessAlert";

const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [values, setValues] = useState({
    firstname: props.firstname,
    lastname: props.lastname,
    email: props.email,
    password: props.password,
  });

  useEffect(() => {
    setValues(props);
  }, [props]);

  const [changed, setChanged] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
  });

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
    setChanged({
      ...changed,
      [event.target.name]: true,
    });
  };

  const handleSaveDetails = (event) => {
    console.log("values: ", values);
    event.preventDefault();
    authenticationService
      .editManagerProfile(
        values.firstname,
        values.lastname,
        values.email,
        values.password,
        props.id
      )
      .then((data) => {
        setStatus({
          ...status,
          success: true,
          error: false,
        });
      })
      .catch((error) => {
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

  const handleDeleteAccount = (event) => {
    event.preventDefault();
    authenticationService
      .deleteManagerProfile(props.id)
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
          <CardHeader subheader="Please edit accordingly" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="dense"
                  name="firstname"
                  onChange={handleChange}
                  value={values.firstname}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="dense"
                  name="lastname"
                  onChange={handleChange}
                  value={values.lastname}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
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
              </Grid>
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
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </CardActions>
        </form>
      </Card>
      {status.error && ErrorAlert(status.errorMessage)}
      {status.success && SuccessAlert("Profile successfully edited!")}
    </div>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default AccountDetails;
