import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import NavBar from "../../../../components/Navigation/Navigation";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { Sidebar } from "../../../../layouts/RiderPT/components";

import PastSchedule from "./components/PastSchedule";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { riderService, authenticationService } from "../../../../services"
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
  Tooltip,
  TableSortLabel,
} from "@material-ui/core";
import RiderHistoryInfo from "./RiderHistoryInfo"

const now = new Date();
const tomorrow = new Date(now)
tomorrow.setDate(tomorrow.getDate() + 1)
var dd = String(tomorrow.getDate()).padStart(2, '0');
var mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
var yyyy = tomorrow.getFullYear();

const today = yyyy + '-' + mm + '-' + dd;

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 100,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const RiderHistory = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [showData, setShowData] = useState(false);
  const [end, setEnd] = useState(today)
  const classes = useStyles();
  const [shifts, setShifts] = useState([])


  const handleEnterButton = () => {
    console.log(moment(selectedDate).month());

    setShowData(true);
  };

  const handleEndDate = (e) => {
    setEnd(e.target.value)
    console.log(end);
    riderService.getshifts(authenticationService.currentUserValue.id, e.target.value).then((response) => {
      response.json().then((data) => {
        setShifts(data)
      })
    })
  }


  return (
    <div>
      <NavBar history={props.history} />
      <Grid container item spacing={6}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
        </Grid>
        <Grid container item spacing={4} id="page-wrap">
          <Grid container direction="row" justify="center" alignItems="center">
            {" "}
            <form>
                <div class="form-row">
                    
                    <div class="col" align="center">
                        <label>Select Date</label>
                        <input type="date" class="form-control" defaultValue={end} onChange={handleEndDate} />
                    </div>
                    
                </div>
                {/* {this.state.error && ErrorAlert(this.state.errorMessage)} */}
            </form>
          </Grid>
         
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {" "}
              <Card>
      <CardHeader align="center" title="Shifts" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Start Time
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>End Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shifts.map((shift) => (
                  <RiderHistoryInfo start={shift.starttime} end={shift.endtime} />
                  // <TableRow hover key={schedule.id}>
                  //   <TableCell>{schedule.start}</TableCell>
                  //   <TableCell>{schedule.end}</TableCell>
                  //   <TableCell>{schedule.day}</TableCell>
                  // </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
              {/* <PastSchedule /> */}
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default RiderHistory;
