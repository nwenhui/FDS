import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Staff/components";
import {
  AddPromotion,
  CurrentPromotion,
  data,
  PastPromotion,
  NewPromotion,
} from "./components";
import { authenticationService, restaurantService } from "../../../../services";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const StaffPromo = (props) => {
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

  const [promotions] = useState(props.promotions);
  console.log("does this work?", props.promotions);

  // useEffect(() => {
  //   setPromotions(props.promotions)
  // })

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
            color="secondary"
            size="small"
            onClick={handleClick}
            style={{ width: "200px", height: "50px" }}
          >
            Add New Promotion
          </Button>
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
class Promotionsss extends Component {
  state = {
    resid: null,
    ongoing: [],
    past: [],
  };

  fetchPromotions() {
    restaurantService
      .getOngoingPromotions(this.state.resid)
      .then((response) => {
        response.json().then((data) => {
          console.log("data: ", data);
          this.setState(
            { ongoing: restaurantService.restaurantPromotionsResults(data) },
            () => {
              console.log(this.state.promotions);
            }
          );
        });
      });
    restaurantService.getPastPromotions(this.state.resid).then((response) => {
      response.json().then((data) => {
        console.log("data: ", data);
        this.setState(
          { past: restaurantService.restaurantPromotionsResults(data) },
          () => {
            console.log(this.state.promotions);
          }
        );
      });
    });
  }

  componentDidMount() {
    console.log("helloo", authenticationService.currentUserValue);
    authenticationService.currentUser.subscribe((x) => {
      if (x !== null) {
        this.setState(
          {
            resid: x.restaurantid,
          },
          () => {
            console.log("res???????", this.state.resid);
            this.fetchPromotions(this.state.resid);
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
              <StaffPromo
                ongoing={this.state.ongoing}
                past={this.state.past}
                resid={this.state.resid}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Promotionsss;
