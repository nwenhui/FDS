import React, { useState } from "react";
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
    userName: "Shen@gmail.com",
    password: "gfshdgdfah",
  });

  const [creditcard, setCreditcard] = useState(["425543", "543321"]);
  const [location, setLocation] = useState(["Jurong Street 10"]);

  /**** Fetch current user data from the backend ****
  let data;

  const url = 'api/v1/...';

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    data = JSON.parse(result);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  /**** Upload modified user data to the backend ****

  const url = 'api/v1/...';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then(() => {
    console.log('Success!');
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddCreditCard = () => {
    setCreditcard(creditcard.concat(""));
  };

  const handleCreditCardChange = (event, index) => {
    console.log("The index is: " + index);
    let cards = [...creditcard];
    let card = [...cards[index]];
    card = event.target.value;
    cards[index] = card;
    console.log("Cards are: " + cards);
    setCreditcard(cards);
    console.log(typeof event.target.value);
  };

  const handleAddLocation = () => {
    setLocation(location.concat(""));
  };

  const handleLocationChange = (event, index) => {
    console.log("The index is: " + index);
    let locs = [...location];
    let loc = [...location[index]];
    loc = event.target.value;
    locs[index] = loc;
    console.log("Locations are: " + locs);
    setLocation(locs);
  };

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
                helperText="Please specify the email"
                label="Email"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
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
                required
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              {creditcard.map((value, index) => {
                return (
                  <div key={index}>
                    <TextField
                      fullWidth
                      label="CreditCard"
                      margin="dense"
                      name="creditCard"
                      onChange={(e) => handleCreditCardChange(e, index)}
                      type="number"
                      value={value}
                      variant="outlined"
                    />
                  </div>
                );
              })}

              <Button onClick={handleAddCreditCard}>Add CreditCard</Button>
            </Grid>
            <Grid item md={6} xs={12}>
              {location.map((value, index) => {
                return (
                  <div key={index}>
                    <TextField
                      fullWidth
                      label="Location"
                      margin="dense"
                      name="location"
                      onChange={(e) => handleLocationChange(e, index)}
                      value={value}
                      variant="outlined"
                    />
                  </div>
                );
              })}

              <Button onClick={handleAddLocation}>Add Location</Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            Save details
          </Button>
          <Button color="primary" variant="contained">
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
