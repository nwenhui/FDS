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

const EditFood = (props) => {
  const { className, data, ...rest } = props;
  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState(data.categories);
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.original);
  const [dailyLimit, setDailyLimit] = useState(data.dailyLimit);

  console.log(name);
  const options = [
    { value: "Seafood", label: "Seafood" },
    { value: "Western", label: "Western" },
    { value: "Chicken", label: "Chicken" },
    { value: "Japanese", label: "Japanese" },
    { value: "Spicy", label: "Spicy" },
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

  // QUERY: UPDATE (Categories[], name, price, dailylimit)
  const handleEnterButton = () => {
    console.log(selectedCategory);
    console.log(name);
    console.log(price);
    console.log(dailyLimit);
    console.log(props.data.fid);
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
        Edit Food Item: {props.data.fid}
      </div>

      <div>Select Categories</div>

      <Select
        value={selectedCategory}
        onChange={handleSelectChange}
        options={options}
        isMulti
      />

      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          aria-describedby="my-helper-text"
          onChange={handleName}
          defaultValue={name}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Price</InputLabel>
        <Input
          aria-describedby="my-helper-text"
          onChange={handlePrice}
          defauleValue={price}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Daily Limit</InputLabel>
        <Input
          aria-describedby="my-helper-text"
          onChange={handleDailyLimit}
          defaultValue={dailyLimit}
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

EditFood.propTypes = {
  className: PropTypes.string,
};

export default EditFood;
