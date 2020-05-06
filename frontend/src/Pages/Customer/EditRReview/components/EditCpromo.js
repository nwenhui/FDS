import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
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
    // marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const EditCpromo = (props) => {
  const { className, data, ...rest } = props;

  const classes = useStyles();
  //const [RestaurantReview, setRestaurantReview] = useState("");
  const [RReview, setRReview] = useState(data.rreview);
  const [RRating, setRRating] = useState(data.rrating);

  const handleRRating = (e) => {
    setRRating(e.target.value);
  };
  const handleRReview = (e) => {
    setRReview(e.target.value);
  };

  // QUERY: INSERT
  const handleEnterButton = () => {
    console.log(RRating);
    console.log(RReview);

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
        Edit Review: {props.data.restaurant}
      </div>

      <FormControl>
        <InputLabel htmlFor="my-input">Rating</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handleRRating}
          defaultValue={RRating}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Review</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handleRReview}
          defaultValue={RReview}
        />
      </FormControl>

      <Button
        color="secondary"
        size="small"
        variant="contained"
        onClick={handleEnterButton}
      >
        Enter
      </Button>
    </div>
  );
};

EditCpromo.propTypes = {
  className: PropTypes.string,
};

export default EditCpromo;
