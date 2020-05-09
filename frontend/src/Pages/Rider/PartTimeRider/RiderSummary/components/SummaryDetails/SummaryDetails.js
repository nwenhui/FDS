import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { managerService, riderService, authenticationService } from "../../../../../../services";
import { userType } from "../../../../../../helpers";
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
import ErrorAlert from "../../../../../../components/Alerts/ErrorAlert/ErrorAlert";
// import DeliverySummaryInfo from "./DeliverySummaryInfo";



import {
  Grid,
} from "@material-ui/core";



const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
var dd = String(tomorrow.getDate()).padStart(2, "0");
var mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
var yyyy = tomorrow.getFullYear();

const today = yyyy + "-" + mm + "-" + dd;

class SummaryDetails extends Component {
  state = {
    start: today,
    end: today,
    id: authenticationService.currentUserValue.id,
    salary: 0,
    journey: 0,
    hours: 0
  }
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
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("clickyyyy");
    this.setState({ start: this.state.start, end: this.state.end });
  };

  fetchData = () => {
    riderService.basesalary(this.state.id, this.state.start).then((response) => {
      response.json().then((data) => {
        this.setState({ salary: data.basesalary, journey: data.totaljourney, salary: data.totalsalary})
      })
    })
    riderService.totalhours(this.state.id, this.state.start, this.state.end).then((response) => {
      response.json().then((data) => {
        const count = data.count;
        console.log(count)
        // if (authenticationService.currentUserTypeValue == userType.FTRider) {
        //   console.log("hello")
          this.setState({ hours: count })
        // } else {
        //   this.setState({ hours: count })
        // }
      })
    })
  };

  render() {
    return (
      <div>
        <Grid container spacing={6}>
          

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
                </div>
              </form>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              {/* <OrderSummary /> */}
              <Card>
                <CardHeader title="Summary Info" />
                <Divider />
                <CardContent>
                  <PerfectScrollbar>
                    <div>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">
                              Base Salary
                            </TableCell>
                            <TableCell align="center">
                              Total No. of Shifts Worked
                            </TableCell>
                            <TableCell align="center">No. of Deliveries</TableCell>
                            <TableCell align="center">Total Salary Earned</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          <TableRow>
                            <TableCell align="center">
                              ${this.state.salary}
                            </TableCell>
                            <TableCell align="center">
                              {this.state.hours} hrs
                            </TableCell>

                            <TableCell align="center">
                              {this.state.journey}
                            </TableCell>
                            <TableCell align="center">
                              ${this.state.salary}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </PerfectScrollbar>
                </CardContent>
                <Divider />
                {this.state.error && ErrorAlert(this.state.msg)}
              </Card>
            </Grid>

            

            {/* <Grid item lg={12} sm={12} xl={12} xs={12}>
              <MonthlySummary></MonthlySummary>
            </Grid> */}
          </Grid>
        </Grid>
      </div>
      // <Box width={500}>
      //   <Card>
      //     <form autoComplete="off" noValidate>
      //       <CardHeader
      //         title="Weekly Summary"
      //         style={{ textAlign: "center" }}
      //       />

      //       <Divider />
      //       <CardContent>
      //         <Grid container spacing={1}>
      //           <Grid item md={12} xs={12}>
      //             <Typography variant="h6" component="h2">
      //               Base Salary: $400
      //             </Typography>
      //           </Grid>

      //           <Grid item md={12} xs={12}>
      //             <Typography variant="h6" component="h2">
      //               Total Hours Worked: 75
      //             </Typography>
      //           </Grid>

      //           <Grid item md={12} xs={12}>
      //             <Typography variant="h6" component="h2">
      //               Total Number of Journeys: 26
      //             </Typography>
      //           </Grid>

      //           <Grid item md={12} xs={12}>
      //             <Typography variant="h6" component="h2">
      //               Total Salary Earned: $600
      //             </Typography>
      //           </Grid>
      //         </Grid>
      //       </CardContent>
      //       <Divider />
      //     </form>
      //   </Card>
      // </Box>
    );
  }
}

SummaryDetails.propTypes = {
  className: PropTypes.string,
};

export default SummaryDetails;
