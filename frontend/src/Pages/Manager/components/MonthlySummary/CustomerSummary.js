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
import OrderSummary from "./OrderSummary";
import DeliverySummery from "./DeliverySummary";
import { managerService } from "../../../../services";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import ErrorAlert from "../../../../components/Alerts/ErrorAlert/ErrorAlert";
import DeliverySummaryInfo from "./DeliverySummaryInfo";

const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
var dd = String(tomorrow.getDate()).padStart(2, "0");
var mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
var yyyy = tomorrow.getFullYear();

const today = yyyy + "-" + mm + "-" + dd;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const CustomerSummary = () => {
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
  state = {
    start: today,
    end: today,
    selectedCategory: 0,
    error: false,
    errorMessage: "",
    showorder: false,
    locations: [],
    restuarant: 0,
    customer: 0,
    orders: 0,
    cost: 0,
    nett: 0,
    customerid: 0,
  };
  setStartDate = (event) => {
    this.setState({ start: event.target.value }, () => {
      console.log("start: ", this.state.start);
      this.fetchData();
    });
  };

  setEndDate = (event) => {
    this.setState({ end: event.target.value }, () => {
      console.log("start: ", this.state.end);
      this.fetchData();
    });
  };

  setCustomerid = (event) => {
    managerService.checkcustomerid(event.target.value).then((response) => {
      response.json().then((data) => {
        this.setState({ customerid: event.target.value, error: false }, () => {
          console.log("start: ", this.state.customerid);
          // this.fetchData();
        });
      })
      .catch((error) => {
        error.text().then((errorMessage) => {
          this.setState({ error: true, errorMessage })
        })
      })
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("clickyyyy");
    this.setState({ start: this.state.start, end: this.state.end });
  };

  fetchData = () => {
    // managerService
    //   .locations(this.state.start, this.state.end)
    //   .then((response) => {
    //     response.json().then((data) => {
    //       console.log("locations: ", this.state.locations);
    //       this.setState(
    //         { locations: managerService.locationsresults(data) },
    //         () => {
    //           console.log("locations: ", managerService.locationsresults(data));
    //         }
    //       );
    //     });
    //   });
    // managerService
    //   .newrestaurantcount(this.state.start, this.state.end)
    //   .then((response) => {
    //     response.json().then((data) => {
    //       this.setState({ restuarant: data.count });
    //     });
    //   });

    // managerService
    //   .newcustomercount(this.state.start, this.state.end)
    //   .then((response) => {
    //     response.json().then((data) => {
    //       this.setState({ customer: data.count });
    //     });
    //   });

    managerService
      .custoemrorderscount(this.state.start, this.state.end, this.state.customerid)
      .then((response) => {
        response.json().then((data) => {
          this.setState({ orders: data.count });
        });
      });

    managerService
      .customertotalfoodcost(this.state.start, this.state.end, this.state.customerid)
      .then((response) => {
        response.json().then((data) => {
          this.setState({ cost: data.sum });
        });
      });

    managerService
      .customertotalnett(this.state.start, this.state.end, this.state.customerid)
      .then((response) => {
        response.json().then((data) => {
          this.setState({ nett: data.sum });
        });
      });
  };

  handleSelectChange = (event) => {
    this.setState({ showorder: true });
  };

  componentDidMount() {
    if (this.state.start > this.state.end) {
      this.setState({
        error: true,
        msg: "Start date selected cannot be after end date",
      });
    }
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
              {/* <SummaryDashboard></SummaryDashboard> */}
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div class="form-row">
                  <div class="col" align="center">
                    <label>Start Date</label>
                    <input
                      type="date"
                      class="form-control"
                      value={this.state.start}
                      onChange={this.setStartDate.bind(this)}
                    />
                  </div>
                  <div class="col" align="center">
                    <label>End Date</label>
                    <input
                      type="date"
                      class="form-control"
                      value={this.state.end}
                      onChange={this.setEndDate.bind(this)}
                    />
                  </div>
                  <div class="col" align="center">
                    <label>Enter Customer ID</label>
                    <input
                      type="number"
                      class="form-control"
                      value={this.state.customerid}
                      onChange={this.setCustomerid.bind(this)}
                    />
                  </div>
                </div>
              </form>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              {/* <OrderSummary /> */}
              <Card>
                <CardHeader title="Total" />
                <Divider />
                <CardContent>
                  <PerfectScrollbar>
                    <div>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">
                              No. of Orders
                            </TableCell>
                            <TableCell align="center">
                              Total Food Cost
                            </TableCell>
                            <TableCell align="center">Total Nett</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          <TableRow>
                            <TableCell align="center">
                              {this.state.restuarant}
                            </TableCell>
                            <TableCell align="center">
                              ${this.state.cost}
                            </TableCell>
                            <TableCell align="center">
                              ${this.state.nett}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </PerfectScrollbar>
                </CardContent>
                <Divider />
                {/* {this.state.error && ErrorAlert(this.state.msg)} */}
              </Card>
            </Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              {/* <DeliverySummery start={this.state.start} end={this.state.end} /> */}
              <Card>
                <CardHeader title="Orders Info" />
                <Divider />
                <CardContent>
                  <PerfectScrollbar>
                    <div>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">1000-1100</TableCell>
                            <TableCell align="center">1100-1200</TableCell>
                            <TableCell align="center">1200-1300</TableCell>
                            <TableCell align="center">1300-1400</TableCell>
                            <TableCell align="center">1400-1500</TableCell>
                            <TableCell align="center">1500-1600</TableCell>
                            <TableCell align="center">1600-1700</TableCell>
                            <TableCell align="center">1700-1800</TableCell>
                            <TableCell align="center">1800-1900</TableCell>
                            <TableCell align="center">1900-2000</TableCell>
                            <TableCell align="center">2000-2100</TableCell>
                            <TableCell align="center">2100-2200</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.locations.map((location) => (
                            <DeliverySummaryInfo
                              start={this.state.start}
                              end={this.state.end}
                              location={location}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </PerfectScrollbar>
                </CardContent>
                <Divider />
                {/* {this.state.error && ErrorAlert(this.state.msg)} */}
              </Card>
            </Grid>
            {this.state.error && ErrorAlert(this.state.errorMessage)}

            {/* <Grid item lg={12} sm={12} xl={12} xs={12}>
              <MonthlySummary></MonthlySummary>
            </Grid> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default DisplaySummary;
