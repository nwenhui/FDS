import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import mockData from "./data";
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert";
import { authenticationService, riderService } from "../../../../../services";

const useStyles = makeStyles((theme) => ({
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

const AvailableSchedule = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [schedules] = useState(mockData);

  const todayy = new Date(); //create Date object with current date time
  const dayy = todayy.getDay(); //get current day (mon,tues,wed)
  var add; //no. of days to add to current date to get next monday
  switch (dayy) {
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

  const now = new Date();
  const m = new Date(now);
  m.setDate(m.getDate() + add);
  var dd = String(m.getDate()).padStart(2, "0");
  var mm = String(m.getMonth() + 1).padStart(2, "0");
  var yyyy = m.getFullYear();
  const mondate = yyyy + "-" + mm + "-" + dd;

  const tu = new Date(now);
  tu.setDate(tu.getDate() + add + 1);
  var dd = String(tu.getDate()).padStart(2, "0");
  var mm = String(tu.getMonth() + 1).padStart(2, "0");
  var yyyy = tu.getFullYear();
  const tuedate = yyyy + "-" + mm + "-" + dd;

  const w = new Date(now);
  w.setDate(w.getDate() + add + 2);
  var dd = String(w.getDate()).padStart(2, "0");
  var mm = String(w.getMonth() + 1).padStart(2, "0");
  var yyyy = w.getFullYear();
  const weddate = yyyy + "-" + mm + "-" + dd;

  const th = new Date(now);
  th.setDate(th.getDate() + add + 3);
  var dd = String(th.getDate()).padStart(2, "0");
  var mm = String(th.getMonth() + 1).padStart(2, "0");
  var yyyy = th.getFullYear();
  const thurdate = yyyy + "-" + mm + "-" + dd;

  const f = new Date(now);
  f.setDate(f.getDate() + add + 4);
  var dd = String(f.getDate()).padStart(2, "0");
  var mm = String(f.getMonth() + 1).padStart(2, "0");
  var yyyy = f.getFullYear();
  const fridate = yyyy + "-" + mm + "-" + dd;

  const s = new Date(now);
  s.setDate(s.getDate() + add + 5);
  var dd = String(s.getDate()).padStart(2, "0");
  var mm = String(s.getMonth() + 1).padStart(2, "0");
  var yyyy = s.getFullYear();
  const satdate = yyyy + "-" + mm + "-" + dd;

  const su = new Date(now);
  su.setDate(su.getDate() + add + 6);
  var dd = String(su.getDate()).padStart(2, "0");
  var mm = String(su.getMonth() + 1).padStart(2, "0");
  var yyyy = su.getFullYear();
  const sundate = yyyy + "-" + mm + "-" + dd;

  const calendar = [...Array(7)].map((month) => Array(12));
  const dates = [
    mondate,
    tuedate,
    weddate,
    thurdate,
    fridate,
    satdate,
    sundate,
  ];
  const starttimes = [
    " 10:00",
    " 11:00",
    " 12:00",
    " 13:00",
    " 14:00",
    " 15:00",
    " 16:00",
    " 17:00",
    " 18:00",
    " 19:00",
    " 20:00",
    " 21:00",
  ];
  const endtimes = [
    " 11:00",
    " 12:00",
    " 13:00",
    " 14:00",
    " 15:00",
    " 16:00",
    " 17:00",
    " 18:00",
    " 19:00",
    " 20:00",
    " 21:00",
    " 22:00",
  ];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 12; j++) {
      calendar[i][j] = {
        date: dates[i],
        start: starttimes[j],
        end: endtimes[j],
        check: false,
      };
    }
  }

  console.log(calendar[4][5].start);

  const week = Array(7)
    .fill()
    .map((x) => Array(12).fill(false));

  const [sched, setSched] = useState(calendar);

  const handleChange = (index, slot, event) => {
    console.log(index);
    console.log(slot);
    const update = [...sched];
    console.log(update[0][0].check);
    const slot1 = slot + 1;
    const slot2 = slot + 2;
    const slo1 = slot - 1;
    const slo2 = slot - 2;

    if (slot === 0) {
      if (update[index][slot1].check && update[index][slot2].check) {
        setError(true);
        setMsg("You can't select more than 2 consecutive slots");
      } else {
        update[index][slot].check = event.target.checked;
        setSched(update);
        console.log("ok");
        console.log(sched);
      }
    } else if (slot === 11) {
      if (update[index][slo1].check && update[index][slo2].check) {
        setError(true);
        setMsg("You can't select more than 2 consecutive slots");
      } else {
        update[index][slot].check = event.target.checked;
        setSched(update);
        console.log("ok");
        console.log(sched);
      }
    } else if (slot === 1) {
      if (update[index][slo1].check && update[index][slot1].check) {
        setError(true);
        setMsg("You can't select more than 2 consecutive slots");
      } else {
        update[index][slot].check = event.target.checked;
        setSched(update);
        console.log("ok");
        console.log(sched);
      }
    } else if (slot === 10) {
      if (update[index][slo1].check && update[index][slot1].check) {
        setError(true);
        setMsg("You can't select more than 2 consecutive slots");
      } else {
        update[index][slot].check = event.target.checked;
        setSched(update);
        console.log("ok");
        console.log(sched);
      }
    } else {
      if (
        (update[index][slot1].check && update[index][slot2].check) ||
        (update[index][slo1].check && update[index][slo2].check)
      ) {
        setError(true);
        setMsg("You can't select more than 2 consecutive slots");
      } else {
        update[index][slot].check = event.target.checked;
        setSched(update);
        console.log("ok");
        console.log(sched);
      }
    }
  };

  /*DATE OBJECT THINGIES*/
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

  const mon = new Date(
    today.getFullYear(),
    today.getMonth,
    today.getDate + add
  ); //get date of next mon
  const tues = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 1); //get date of next tues
  const wed = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 2); //get date of next wed
  const thur = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 3); //get date of next thur
  const fri = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 4); //get date of next fri
  const sat = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 5); //get date of next sat
  const sun = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 6); //get date of next sun

  var datesOfCheckbox = new Array(7);
  for (var i = 0; i < datesOfCheckbox.length; i++) {
    datesOfCheckbox[i] = new Array(12);
  }

  var h = 0;
  // Loop to initilize 2D array elements.
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 12; j++) {
      datesOfCheckbox[i][j] = h++;
    }
  }

  /*mad hardcode to re-initialize the 2D array elements*/
  datesOfCheckbox[0][0] = mon + "10:00AM to 11:00AM";
  datesOfCheckbox[1][0] = tues + "10:00AM to 11:00AM";
  datesOfCheckbox[2][0] = wed + "10:00AM to 11:00AM";
  datesOfCheckbox[3][0] = thur + "10:00AM to 11:00AM";
  datesOfCheckbox[4][0] = fri + "10:00AM to 11:00AM";
  datesOfCheckbox[5][0] = sat + "10:00AM to 11:00AM";
  datesOfCheckbox[6][0] = sun + "10:00AM to 11:00AM";

  datesOfCheckbox[0][1] = mon + "11:00AM to 12:00PM";
  datesOfCheckbox[1][1] = tues + "11:00AM to 12:00PM";
  datesOfCheckbox[2][1] = wed + "11:00AM to 12:00PM";
  datesOfCheckbox[3][1] = thur + "11:00AM to 12:00PM";
  datesOfCheckbox[4][1] = fri + "11:00AM to 12:00PM";
  datesOfCheckbox[5][1] = sat + "11:00AM to 12:00PM";
  datesOfCheckbox[6][1] = sun + "11:00AM to 12:00PM";

  datesOfCheckbox[0][2] = mon + "12:00PM to 1:00PM";
  datesOfCheckbox[1][2] = tues + "12:00PM to 1:00PM";
  datesOfCheckbox[2][2] = wed + "12:00PM to 1:00PM";
  datesOfCheckbox[3][2] = thur + "12:00PM to 1:00PM";
  datesOfCheckbox[4][2] = fri + "12:00PM to 1:00PM";
  datesOfCheckbox[5][2] = sat + "12:00PM to 1:00PM";
  datesOfCheckbox[6][2] = sun + "12:00PM to 1:00PM";

  datesOfCheckbox[0][3] = mon + "1:00PM to 2:00PM";
  datesOfCheckbox[1][3] = tues + "1:00PM to 2:00PM";
  datesOfCheckbox[2][3] = wed + "1:00PM to 2:00PM";
  datesOfCheckbox[3][3] = thur + "1:00PM to 2:00PM";
  datesOfCheckbox[4][3] = fri + "1:00PM to 2:00PM";
  datesOfCheckbox[5][3] = sat + "1:00PM to 2:00PM";
  datesOfCheckbox[6][3] = sun + "1:00PM to 2:00PM";

  datesOfCheckbox[0][4] = mon + "2:00PM to 3:00PM";
  datesOfCheckbox[1][4] = tues + "2:00PM to 3:00PM";
  datesOfCheckbox[2][4] = wed + "2:00PM to 3:00PM";
  datesOfCheckbox[3][4] = thur + "2:00PM to 3:00PM";
  datesOfCheckbox[4][4] = fri + "2:00PM to 3:00PM";
  datesOfCheckbox[5][4] = sat + "2:00PM to 3:00PM";
  datesOfCheckbox[6][4] = sun + "2:00PM to 3:00PM";

  datesOfCheckbox[0][5] = mon + "3:00PM to 4:00PM";
  datesOfCheckbox[1][5] = tues + "3:00PM to 4:00PM";
  datesOfCheckbox[3][5] = thur + "3:00PM to 4:00PM";
  datesOfCheckbox[4][5] = fri + "3:00PM to 4:00PM";
  datesOfCheckbox[5][5] = sat + "3:00PM to 4:00PM";
  datesOfCheckbox[6][5] = sun + "3:00PM to 4:00PM";

  datesOfCheckbox[0][6] = mon + "4:00PM to 5:00PM";
  datesOfCheckbox[1][6] = tues + "4:00PM to 5:00PM";
  datesOfCheckbox[3][6] = thur + "4:00PM to 5:00PM";
  datesOfCheckbox[4][6] = fri + "4:00PM to 5:00PM";
  datesOfCheckbox[5][6] = sat + "4:00PM to 5:00PM";
  datesOfCheckbox[6][6] = sun + "4:00PM to 5:00PM";

  datesOfCheckbox[0][7] = mon + "5:00PM to 6:00PM";
  datesOfCheckbox[1][7] = tues + "5:00PM to 6:00PM";
  datesOfCheckbox[3][7] = thur + "5:00PM to 6:00PM";
  datesOfCheckbox[4][7] = fri + "5:00PM to 6:00PM";
  datesOfCheckbox[5][7] = sat + "5:00PM to 6:00PM";
  datesOfCheckbox[6][7] = sun + "5:00PM to 6:00PM";

  datesOfCheckbox[0][8] = mon + "6:00PM to 7:00PM";
  datesOfCheckbox[1][8] = tues + "6:00PM to 7:00PM";
  datesOfCheckbox[3][8] = thur + "6:00PM to 7:00PM";
  datesOfCheckbox[4][8] = fri + "6:00PM to 7:00PM";
  datesOfCheckbox[5][8] = sat + "6:00PM to 7:00PM";
  datesOfCheckbox[6][8] = sun + "6:00PM to 7:00PM";

  datesOfCheckbox[0][9] = mon + "7:00PM to 8:00PM";
  datesOfCheckbox[1][9] = tues + "7:00PM to 8:00PM";
  datesOfCheckbox[3][9] = thur + "7:00PM to 8:00PM";
  datesOfCheckbox[4][9] = fri + "7:00PM to 8:00PM";
  datesOfCheckbox[5][9] = sat + "7:00PM to 8:00PM";
  datesOfCheckbox[6][9] = sun + "7:00PM to 8:00PM";

  datesOfCheckbox[0][10] = mon + "8:00PM to 9:00PM";
  datesOfCheckbox[1][10] = tues + "8:00PM to 9:00PM";
  datesOfCheckbox[3][10] = thur + "8:00PM to 9:00PM";
  datesOfCheckbox[4][10] = fri + "8:00PM to 9:00PM";
  datesOfCheckbox[5][10] = sat + "8:00PM to 9:00PM";
  datesOfCheckbox[6][10] = sun + "8:00PM to 9:00PM";

  datesOfCheckbox[0][11] = mon + "9:00PM to 10:00PM";
  datesOfCheckbox[1][11] = tues + "9:00PM to 10:00PM";
  datesOfCheckbox[3][11] = thur + "9:00PM to 10:00PM";
  datesOfCheckbox[4][11] = fri + "9:00PM to 10:00PM";
  datesOfCheckbox[5][11] = sat + "9:00PM to 10:00PM";
  datesOfCheckbox[6][11] = sun + "9:00PM to 10:00PM";

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  function count() {
    var counter = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 12; j++) {
        if (sched[i][j].check == true) {
          counter++;
        }
      }
    }
    return counter;
  }

  const submit = () => {
    if (count() < 10) {
      setError(true);
      setMsg(
        "You have not entered enough shifts. Please add at least 10 shifts."
      );
    } else if (count() > 48) {
      setError(true);
      setMsg("You have entered too many shifts. Pkease add at most 48 shifts.");
    } else {
      setError(false);
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 12; j++) {
          if (sched[i][j].check == true) {
            riderService
              .entershift(
                authenticationService.currentUserValue.id,
                sched[i][j].date,
                sched[i][j].start,
                sched[i][j].end
              )
              .then((response) => {
                response.json().then((data) => {
                  console.log("donzo");
                  window.location.reload(false);
                });
              })
              .catch((error) => {
                error.text().then((errorMessage) => {
                  console.log(errorMessage);
                });
              });
          }
        }
      }
    }
  };

  /*testing*/
  return (
    <Card {...rest}>
      <CardHeader title="Available Work Schedule" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>10AM - 11AM</TableCell>
                  <TableCell>11AM - 12PM</TableCell>
                  <TableCell>12PM - 1PM</TableCell>
                  <TableCell>1PM - 2PM</TableCell>
                  <TableCell>2PM - 3PM</TableCell>
                  <TableCell>3PM - 4PM</TableCell>
                  <TableCell>4PM - 5PM</TableCell>
                  <TableCell>5PM - 6PM</TableCell>
                  <TableCell>6PM - 7PM</TableCell>
                  <TableCell>7PM - 8PM</TableCell>
                  <TableCell>8PM - 9PM</TableCell>
                  <TableCell>9PM - 10PM</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{schedule.day}</TableCell>

                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][0].check}
                              onChange={(e) => handleChange(index, 0, e)}
                              name="slot1"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][1].check}
                              onChange={(e) => handleChange(index, 1, e)}
                              name="slot2"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][2].check}
                              onChange={(e) => handleChange(index, 2, e)}
                              name="slot3"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][3].check}
                              onChange={(e) => handleChange(index, 3, e)}
                              name="slot4"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][4].check}
                              onChange={(e) => handleChange(index, 4, e)}
                              name="slot5"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][5].check}
                              onChange={(e) => handleChange(index, 5, e)}
                              name="slot6"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][6].check}
                              onChange={(e) => handleChange(index, 6, e)}
                              name="slot7"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][7].check}
                              onChange={(e) => handleChange(index, 7, e)}
                              name="slot8"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][8].check}
                              onChange={(e) => handleChange(index, 8, e)}
                              name="slot9"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][9].check}
                              onChange={(e) => handleChange(index, 9, e)}
                              name="slot10"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][10].check}
                              onChange={(e) => handleChange(index, 10, e)}
                              name="slot11"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sched[index][11].check}
                              onChange={(e) => handleChange(index, 11, e)}
                              name="slot12"
                            />
                          }
                        />
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => submit()}
        >
          Save details
        </Button>
      </CardActions>
      {error && ErrorAlert(msg)}
    </Card>
  );
};

AvailableSchedule.propTypes = {
  className: PropTypes.string,
};

export default AvailableSchedule;
