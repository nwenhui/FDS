import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
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

import { AvgOrders, NumOrders, TopFive, TotalProfit } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const StaffDashboard = () => {
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
        {showData && (
          <Grid item lg={4} md={4} xl={4} xs={12}>
            <AvgOrders data={32} />
            {/* <AvgOrders data={summary.avgOrders}/> */}
          </Grid>
        )}
        {showData && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <NumOrders data={20} />
            {/* <NumOrders data={summary.numOrders} /> */}
          </Grid>
        )}
        {showData && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalProfit data={20} />
            {/* <TotalProfit data={summary.totalProfit} /> */}
          </Grid>
        )}
        {showData && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TopFive
              data={["Chicken Rice", "Pudding", "Apple", "Pear", "Watermelon"]}
            />
            {/* <TopFive data={summary.topFive} /> */}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default StaffDashboard;
