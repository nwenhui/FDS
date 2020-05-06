import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Manager/components";
import { AddDeliveryFee, CurrentDeliveryFee, data } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const ManagerPromo = () => {
  const classes = useStyles();
  const [openDiv, setOpenDiv] = useState(false);

  const handleOpenDiv = () => {
    setOpenDiv(!openDiv);
  };

  // List all promotion
  // QUERY: fis, name, original, discounted, dailyLimit, categories[]

  return (
    <div className={classes.root}>
      <Grid container item spacing={4}>
        <Grid item lg={2} sm={2} xl={2} xs={2}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpenDiv}
            style={{ width: "130px" }}
          >
            Add DeliveryFee
          </Button>
          {openDiv && <AddDeliveryFee onClick={handleOpenDiv} />}
        </Grid>

        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CurrentDeliveryFee data={data} />
        </Grid>
      </Grid>
    </div>
  );
};
class Salary extends Component {
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
              <ManagerPromo></ManagerPromo>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Salary;
