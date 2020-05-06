import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
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

const AddPromo = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState("restaurant");
  const [RestaurantReview, setRestaurantReview] = useState("");
  const [RReview, setRReview] = useState("");
  const [RRating, setRRating] = useState("");

  const [DeliveryReview, setDeliveryReview] = useState("");
  const [DRating, setDRating] = useState("");

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleRestaurantReview = (e) => {
    setRestaurantReview(e.target.value);
  };
  const handleRReview = (e) => {
    setRReview(e.target.value);
  };
  const handleRRating = (e) => {
    setRRating(e.target.value);
  };
  const handleDeliveryReview = (e) => {
    setDeliveryReview(e.target.value);
  };

  const handleDRating = (e) => {
    setDRating(e.target.value);
  };

  // QUERY: INSERT data
  const handleEnterButton = () => {
    switch (selectedCategory) {
      case "restaurant":
        console.log(RRating);
        console.log(RReview);

        break;
      case "delivery":
        console.log(DRating);

        break;
      default:
        console.log("error");
    }
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
      <FormControl style={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Review For:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          onChange={handleSelectChange}
        >
          <MenuItem value={"restaurant"}>Restaurant</MenuItem>
          <MenuItem value={"delivery"}>Delivery</MenuItem>
        </Select>
      </FormControl>

      {selectedCategory == "restaurant" && (
        <FormControl>
          <InputLabel htmlFor="my-input">Rating</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={handleRRating}
          />
        </FormControl>
      )}
      {selectedCategory == "restaurant" && (
        <FormControl>
          <InputLabel htmlFor="my-input">Review</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={handleRReview}
          />
        </FormControl>
      )}

      {selectedCategory == "delivery" && (
        <FormControl>
          <InputLabel htmlFor="my-input">Rating</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={handleDRating}
          />
        </FormControl>
      )}
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

AddPromo.propTypes = {
  className: PropTypes.string,
};

export default AddPromo;
