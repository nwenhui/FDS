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
    password: "*****",
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

  const handleSaveDetails = () => {};

  const handleDeleteAccount = () => {};

  return (
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
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default AccountDetails;
