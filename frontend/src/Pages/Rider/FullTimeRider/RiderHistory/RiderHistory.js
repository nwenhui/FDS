import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import NavBar from "../../../../components/Navigation/Navigation";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { Sidebar } from "../../../../layouts/RiderFT/components";

import PastSchedule from "./components/PastSchedule";

const RiderHistory = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [showData, setShowData] = useState(false);

  const handleEnterButton = () => {
    console.log(moment(selectedDate).month());

    setShowData(true);
  };

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
            <text style={{ marginRight: "8px" }}>Select Date:</text>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker value={selectedDate} onChange={handleDateChange} />
            </MuiPickersUtilsProvider>
            <Button color="secondary" size="small" onClick={handleEnterButton}>
              Enter
            </Button>
          </Grid>
          {showData && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {" "}
              <PastSchedule />
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default RiderHistory;
