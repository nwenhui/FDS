import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Manager/components";
import {
  CurrentPromotion,
  AddPromotion,
  data,
  NewPromotion,
  PastPromotion,
} from "./components";
import { authenticationService, staffService } from "../../../../services";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const ManagerPromo = (props) => {
  const classes = useStyles();
  const [openDiv, setOpenDiv] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const handleOpenDiv = () => {
    setOpenDiv(!openDiv);
  };

  // List all promotion
  // QUERY: fis, name, original, discounted, dailyLimit, categories[]

  return (
    <div className={classes.root}>
      <Grid container item spacing={4} alignItems="center" justify="center">
        <Grid item lg={2} sm={2} xl={2} xs={2}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClick}
            style={{ width: "200px", height: "50px" }}
          >
            Add New Promotion
          </Button>
          {/* {openDiv && <AddPromotion onClick={handleOpenDiv} />} */}
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          {open && <NewPromotion resid={props.resid} />}
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CurrentPromotion data={data} promotions={props.ongoing} />
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <PastPromotion data={data} promotions={props.past} />
        </Grid>
      </Grid>
    </div>
  );
};
class Promo extends Component {
  state = {
    ongoing: [],
    past: [],
  };
  fetchPromotions() {
    staffService
      .getOngoingPromotions()
      .then((response) => {
        response.json().then((data) => {
          console.log("data: ", data);
          this.setState(
            { ongoing: staffService.fdsPromotionsResults(data) });
        });
      });
    staffService.getPastPromotions().then((response) => {
      response.json().then((data) => {
        console.log("data: ", data);
        this.setState(
          { past: staffService.fdsPromotionsResults(data) });
      });
    });
  }

  componentDidMount() {
    this.fetchPromotions();
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
              <ManagerPromo
                ongoing={this.state.ongoing}
                past={this.state.past}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Promo;
