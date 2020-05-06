import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import NavBar from "../../../../components/Navigation/Navigation";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { Sidebar } from "../../../../layouts/RiderPT/components";

import AvailableSchedule from "./components/AvailableSchedule";

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
            <Typography color="textSecondary" variant="h5">
              Submit your monthly schedule!
            </Typography>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Typography color="textSecondary" variant="h7">
              Just fill in schedule for one week as it will be replicated for
              the next 3 weeks of the month :)
            </Typography>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <AvailableSchedule />
          </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default RiderSubmitSched;
