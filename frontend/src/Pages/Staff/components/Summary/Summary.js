import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Staff/components";
import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import moment from "moment";

import { NumOfOrders, TopFive, TotalProfit } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const SummaryDashboard = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showData, setShowData] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e);
  };

  const handleEnterButton = () => {
    console.log(moment(selectedDate).month());

    /**** Upload the selected month to the backend ****

    const month = moment(selectedDate).month();
    const url = 'api/v1/...' + month;
    let summary;

    fetch(url)
    .then((response) => response.json())
    .then((result) => {
      summary = JSON.parse(result);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

    ****/

    setShowData(true);
  };

  return (
    <div className={classes.root}>
      <Grid container item spacing={4}>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <text style={{ marginRight: "8px" }}>Select Month:</text>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={selectedDate} onChange={handleDateChange} />
          </MuiPickersUtilsProvider>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={handleEnterButton}
          >
            Enter
          </Button>
        </Grid>
        {/* {showData && (
          <Grid item lg={4} md={4} xl={4} xs={12}>
            <AvgOrders data={32} />
            <AvgOrders data={summary.avgOrders}/>
          </Grid>
        )} */}
        {showData && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TopFive
              data={[
                "Prata",
                "Oyako Don",
                "Thai Milk Tea",
                "Gong Cha",
                "Chicken Rice",
              ]}
            />
            {/* <TopFive data={summary.topFive} /> */}
          </Grid>
        )}
        {showData && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <NumOfOrders data={20} />
            {/* <NumOrders data={summary.numOrders} /> */}
          </Grid>
        )}
        {showData && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalProfit data={20} />
            {/* <TotalProfit data={summary.totalProfit} /> */}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

class Summary extends Component {
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
              <SummaryDashboard></SummaryDashboard>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Summary;
