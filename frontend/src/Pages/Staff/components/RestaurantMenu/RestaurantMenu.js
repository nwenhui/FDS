import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Staff/components";
import { AddFood, data, FoodItem, NewFood } from "./components";

import { authenticationService, restaurantService } from "../../../../services";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const StaffFoodItem = (props) => {
  const classes = useStyles();
  const [openDiv, setOpenDiv] = useState(false);

  const handleOpenDiv = () => {
    setOpenDiv(!openDiv);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }


  return (
    <div className={classes.root}>
      <Grid container item spacing={4} alignItems="center" justify="center">
        <Grid item lg={2} sm={2} xl={2} xs={2}>
          <Button
            color="secondary"
            size="small"
            variant="contained"
            onClick={handleClick}
            style={{ width: "200px", height: "50px" }}
          >
            Add New Food Item
          </Button>
          {/* {openDiv && <AddFood onClick={handleOpenDiv} />} */}
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          {open && <NewFood resid={props.resid} />}
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <FoodItem data={data} menu={props.menu}/>
        </Grid>
      </Grid>
    </div>
  );
};

class Menu extends Component {
  state = {
    resid: null,
    menu: []
  }

  fetchMenu() {
    restaurantService.getMenu(this.state.resid).then((response) => {
      response.json()
      .then((data) => {
        this.setState({ menu: restaurantService.restaurantMenuResults(data) });
      })
    })
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) => {
      if (x !== null) {
        this.setState(
          {
            resid: x.restaurantid
          },
          () => {
            this.fetchMenu();
          }
        );
      }
    });
  }

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
              <StaffFoodItem menu={this.state.menu} resid={this.state.resid} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Menu;
