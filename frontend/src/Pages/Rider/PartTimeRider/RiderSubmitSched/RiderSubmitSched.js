import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import NavBar from "../../../../components/Navigation/Navigation";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { Sidebar } from "../../../../layouts/RiderPT/components";
import { authenticationService, riderService } from "../../../../services";

import AvailableSchedule from "./components/AvailableSchedule";

const today = new Date(); //create Date object with current date time
const day = today.getDay(); //get current day (mon,tues,wed)
var add; //no. of days to add to current date to get next monday
switch (day) {
  case 0: //currently sunday
    add = 1;
    break;
  case 1: //currently mon
    add = 7;
    break;
  case 2: //currently tues
    add = 6;
    break;
  case 3: //currently wed
    add = 5;
    break;
  case 4: //currently thur
    add = 4;
    break;
  case 5: //currently fri
    add = 3;
    break;
  case 6: //currently sat
    add = 2;
    break;
}

// const now = new Date();
// const mon = new Date(now)
// function convert (date, add) {
//   date.setDate(date.getDate() + add)
//   var dd = String(date.getDate()).padStart(2, '0');
//   var mm = String(date.getMonth() + 1).padStart(2, '0');
//   var yyyy = date.getFullYear();

//   return yyyy + '-' + mm + '-' + dd;
// }
//   console.log(convert(mon, add))

const now = new Date();
const mon = new Date(now);
mon.setDate(mon.getDate() + add);
var dd = String(mon.getDate()).padStart(2, "0");
var mm = String(mon.getMonth() + 1).padStart(2, "0");
var yyyy = mon.getFullYear();

const mondate = yyyy + "-" + mm + "-" + dd;

const sun = new Date(now);
sun.setDate(sun.getDate() + add + 6);
var dd = String(sun.getDate()).padStart(2, "0");
var mm = String(sun.getMonth() + 1).padStart(2, "0");
var yyyy = sun.getFullYear();

const sundate = yyyy + "-" + mm + "-" + dd;

const RiderSubmitSched = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [showData, setShowData] = useState(false);

  const handleEnterButton = () => {
    console.log(moment(selectedDate).month());

    setShowData(true);
  };

  return (
    <div>
      <NavBar history={props.history} />
      <Grid container item spacing={9}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
        </Grid>
        <Grid container item spacing={4} id="page-wrap">
          <Grid container direction="row" justify="center" alignItems="center">
            {riderService.currentSubmitValue ? 
            <Typography color="textSecondary" variant="h5">
              Submit your weekly schedule for {mondate} to {sundate}!
            </Typography> :
            <Typography color="textSecondary" variant="h5">
            You've already submitted your weekly schedule for {mondate} to {sundate}!
          </Typography>}
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            {riderService.currentSubmitValue && <AvailableSchedule />}
          </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default RiderSubmitSched;
