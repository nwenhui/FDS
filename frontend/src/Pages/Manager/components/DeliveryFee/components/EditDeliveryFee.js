import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button,
} from "@material-ui/core";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const EditDeliveryFee = (props) => {
  const { className, data, ...rest } = props;
  console.log(data);

  const classes = useStyles();

  const [discount, setDiscount] = useState(data.discount);
  const [minAmt, setMinAmt] = useState(data.minAmount);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const handleMinAmt = (e) => {
    setMinAmt(e.target.value);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  // QUERY: UPDATE (discount, minAmt, startDate, endDate)
  const handleEnterButton = () => {
    console.log(discount);
    console.log(minAmt);
    console.log(startDate);
    console.log(endDate);
    props.onClick();
  };

  return (
    <div
      style={{
        borderStyle: "solid",
        border: "1px solid black",
        backgroundColor: "white",
        zIndex: "1",
        position: "fixed",
        left: "40%",
        top: "30%",
        padding: "46px",
        width: "300px",
      }}
    >
      <div style={{ marginBottom: "5px" }}>
        Edit Promotion: {props.data.promo_id}
      </div>

      <FormControl>
        <InputLabel htmlFor="my-input">Discount</InputLabel>
        <Input
          aria-describedby="my-helper-text"
          onChange={handleDiscount}
          defaultValue={discount}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Minimum Amount</InputLabel>
        <Input
          aria-describedby="my-helper-text"
          onChange={handleMinAmt}
          defaultValue={minAmt}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Start Date"
          type="datetime-local"
          defaultValue={moment(startDate)}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleStartDate}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="End Date"
          type="datetime-local"
          defaultValue={moment(endDate)}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleEndDate}
        />
      </FormControl>
      <Button
        color="primary"
        size="small"
        variant="contained"
        onClick={handleEnterButton}
      >
        Enter
      </Button>
    </div>
  );
};

EditDeliveryFee.propTypes = {
  className: PropTypes.string,
};

export default EditDeliveryFee;
