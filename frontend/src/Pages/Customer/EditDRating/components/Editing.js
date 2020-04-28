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

const Editing = (props) => {
  const { className, data, ...rest } = props;

  const classes = useStyles();

  const [DRating, setDRating] = useState(data.drating);

  const handleDRating = (e) => {
    setDRating(e.target.value);
  };

  // QUERY: INSERT
  const handleEnterButton = () => {
    console.log(DRating);
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
        Edit Delivery Promotion: {props.data.ridername}
      </div>

      <FormControl>
        <InputLabel htmlFor="my-input">Rating</InputLabel>
        <Input
          aria-describedby="my-helper-text"
          onChange={handleDRating}
          defaultValue={DRating}
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

Editing.propTypes = {
  className: PropTypes.string,
};

export default Editing;
