import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Staff/components";
import { AddFood, data, FoodItem } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const StaffFoodItem = () => {
  const classes = useStyles();
  const [openDiv, setOpenDiv] = useState(false);

  const handleOpenDiv = () => {
    setOpenDiv(!openDiv);
  };

  return (
    <div className={classes.root}>
      <Grid container item spacing={4}>
        <Grid item lg={2} sm={2} xl={2} xs={2}>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={handleOpenDiv}
            style={{ width: "130px" }}
          >
            Add New Food Item
          </Button>
          {openDiv && <AddFood onClick={handleOpenDiv} />}
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <FoodItem data={data} />
        </Grid>
      </Grid>
    </div>
  );
};

class Menu extends Component {
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <Grid container spacing={6}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
          </Grid>
          <Grid container item spacing={4} id="page-wrap">
            <Grid item lg={6} sm={6} xl={6} xs={12}></Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <StaffFoodItem></StaffFoodItem>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Menu;
