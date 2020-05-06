import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button,
} from "@material-ui/core";

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

const AddPromotion = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [discount, setDiscount] = useState("");
  const [minAmt, setMinAmt] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  // QUERY: INSERT (discount, minAmt, startDate, endDate)
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
      <FormControl>
        <InputLabel htmlFor="my-input">Discount</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handleDiscount}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Minimum Amount</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handleMinAmt}
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Start Date"
          type="datetime-local"
          defaultValue="2020-03-24T10:30"
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
          defaultValue="2020-03-24T10:30"
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

AddPromotion.propTypes = {
  className: PropTypes.string,
};

export default AddPromotion;
