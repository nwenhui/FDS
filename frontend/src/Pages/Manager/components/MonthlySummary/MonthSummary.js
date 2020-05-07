import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import "react-day-picker/lib/style.css";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Manager/components";
import {
  TotalNewCustomers,
  TotalOrders,
  TotalProfit,
  WeekPicker,
} from "./components";
import { CustomerData } from "./components/CustomerData";
import { RiderData } from "./components/RiderData";
import { DeliveryData } from "./components/DeliveryData";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const MonthlySummary = () => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showCustomer, setShowCustomer] = useState(false);
  const [showRider, setShowRider] = useState(false);
  const [showDelvery, setShowDelivery] = useState(false);
  const [showSales, setShowSales] = useState(false);

  let salesSummary;
  let custSummary;
  let deliverySummary;
  let riderSummary;

  /**** Fetch the sales summary from the backend ****

  let month = moment(selectedDate).month();
  const url = 'api/v1/...' + month;

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    salesSummary = JSON.parse(result);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  /**** Fetch the customer summary from the backend ****

  let month = moment(selectedDate).month();
  const url = 'api/v1/...' + month;

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    custSummary = JSON.parse(result);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  /**** Fetch the delivery summary from the backend ****

  let month = moment(selectedDate).month();
  const url = 'api/v1/...' + month;

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    deliverySummary = JSON.parse(result);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  /**** Fetch the rider summary from the backend ****

  let month = moment(selectedDate).month();
  const url = 'api/v1/...' + month;

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    riderSummary = JSON.parse(result);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleDateChange = (e) => {
    console.log(e);
    setSelectedDate(e);
  };

  const handleEnterBtton = () => {
    console.log(selectedCategory);
    console.log(moment(selectedDate).month());
    switch (selectedCategory) {
      case "customer":
        setShowCustomer(true);
        setShowDelivery(false);
        setShowRider(false);
        setShowSales(false);
        break;
      case "delivery":
        setShowCustomer(false);
        setShowDelivery(true);
        setShowRider(false);
        setShowSales(false);
        break;
      case "rider":
        setShowCustomer(false);
        setShowDelivery(false);
        setShowRider(true);
        setShowSales(false);
        break;
      case "sales":
        setShowCustomer(false);
        setShowDelivery(false);
        setShowRider(false);
        setShowSales(true);
        break;
      default:
        setShowCustomer(false);
        setShowDelivery(false);
        setShowRider(false);
        setShowSales(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container item spacing={4}>
        <Grid item lg={4} sm={4} xl={4} xs={5}>
          <FormControl
            className={classes.formControl}
            style={{ marginTop: "-14px" }}
          >
            <InputLabel id="demo-simple-select-label">Summary</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              onChange={handleSelectChange}
            >
              <MenuItem value={"sales"}>Sales</MenuItem>
              <MenuItem value={"customer"}>Customer</MenuItem>
              <MenuItem value={"delivery"}>Delivery</MenuItem>
              <MenuItem value={"rider"}>Rider</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <text style={{ marginTop: "17px" }}>Selet Month: </text>
        <Grid item lg={4} sm={4} xl={4} xs={5}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={selectedDate} onChange={handleDateChange} />
          </MuiPickersUtilsProvider>
        </Grid>
        <text style={{ marginTop: "17px" }}>Selet Month/Week: </text>
        <Grid item lg={4} sm={4} xl={4} xs={5}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <WeekPicker value={selectedDate} onChange={handleDateChange} />
            {/* <DatePicker value={selectedDate} onChange={handleDateChange} /> */}
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item lg={2} sm={2} xl={2} xs={2}>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={handleEnterBtton}
          >
            Enter
          </Button>
        </Grid>
        {showSales && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalNewCustomers data={20} />
            {/* <TotalNew data={salesSummary.totalNew} /> */}
          </Grid>
        )}
        {showSales && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalOrders data={20} />
            {/* <TotalOrders data={salesSummary.totalOrders} /> */}
          </Grid>
        )}
        {showSales && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalProfit data={20} />
            {/* <TotalProfit data={salesSummary.totalProfit} /> */}
          </Grid>
        )}
        {showCustomer && (
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <CustomerData data={123} />
            {/* <IndividualData data={custSummary}/> */}
          </Grid>
        )}
        {showDelvery && (
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <DeliveryData data={123} />
            {/* <DeliveryData data={deliverySummary} /> */}
          </Grid>
        )}
        {showRider && (
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <RiderData data={123} />
            {/* <RiderData data={riderSummary} /> */}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

class DisplaySummary extends Component {
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
              <MonthlySummary></MonthlySummary>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default DisplaySummary;
