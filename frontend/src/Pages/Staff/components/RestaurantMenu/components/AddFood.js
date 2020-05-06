import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Button,
} from "@material-ui/core";
import Select from "react-select";

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

const AddFood = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState("Selec Categories");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleDailyLimit = (e) => {
    setDailyLimit(e.target.value);
  };

  // QUERY: Insert(Categories[], name, price, dailylimit)
  const handleEnterButton = () => {
    console.log(selectedCategory);
    console.log(name);
    console.log(price);
    console.log(dailyLimit);
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
      <text>Select Categories</text>

      <Select
        value={selectedCategory}
        onChange={handleSelectChange}
        options={options}
        isMulti
      />

      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handleName}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Price</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handlePrice}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Daily Limit</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handleDailyLimit}
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

AddFood.propTypes = {
  className: PropTypes.string,
};

export default AddFood;
