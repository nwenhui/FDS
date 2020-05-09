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
import { riderService, authenticationService } from "../../../../../services";

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

  const dates = [
    mondate,
    tuedate,
    weddate,
    thurdate,
    fridate,
    satdate,
    sundate,
  ];
  console.log(mondate)

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const calendar = [...Array(7)].map((month) => Array(4));
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 4; j++) {
      calendar[i][j] = {
        date: dates[i],
        shift: j,
        check: false,
      };
    }
  }

  // const week = Array(7)
  //   .fill(false)
  //   .map((x) => Array(12).fill(false));

  const [sched, setSched] = useState(calendar);

  const handleChange = (index, slot, event) => {
    const update = [...sched];
    if (slot === 0) {
      if (
        update[index][1].check ||
        update[index][2].check ||
        update[index][3].check
      ) {
        setError(true);
        setMsg("You can't select more than 1 slot per day");
      } else {
        update[index][slot].check = event.target.checked;
        setSched(update);
        setError(false);
      }
    } else if (slot === 1) {
      if (
        update[index][0].check ||
        update[index][2].check ||
        update[index][3].check
      ) {
        setError(true);
        setMsg("You can't select more than 1 slot per day");
      } else {
        update[index][slot].check = event.target.checked;
        setSched(update);
        setError(false);
      }
    } else if (slot === 2) {
      if (
        update[index][0].check ||
        update[index][1].check ||
        update[index][3].check
      ) {
        setError(true);
        setMsg("You can't select more than 1 slot per day");
      } else {
        update[index][slot].check = event.target.checked;
        setSched(update);
        setError(false);
      }
    } else if (slot === 3) {
      if (
        update[index][0].check ||
        update[index][2].check ||
        update[index][0].check
      ) {
        setError(true);
        setMsg("You can't select more than 1 slot per day");
      } else {
        update[index][slot].check = event.target.checked;
        setSched(update);
        setError(false);
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
    datesOfCheckbox[i] = new Array(4);
  }

  var h = 0;
  // Loop to initilize 2D array elements.
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 4; j++) {
      datesOfCheckbox[i][j] = h++;
    }
  }

  /*mad hardcode to re-initialize the 2D array elements*/
  datesOfCheckbox[0][0] = mon + "10:00AM - 2:00PM & 3:00PM - 7:00PM";
  datesOfCheckbox[1][0] = tues + "10:00AM - 2:00PM & 3:00PM - 7:00PM";
  datesOfCheckbox[2][0] = wed + "10:00AM - 2:00PM & 3:00PM - 7:00PM";
  datesOfCheckbox[3][0] = thur + "10:00AM - 2:00PM & 3:00PM - 7:00PM";
  datesOfCheckbox[4][0] = fri + "10:00AM - 2:00PM & 3:00PM - 7:00PM";
  datesOfCheckbox[5][0] = sat + "10:00AM - 2:00PM & 3:00PM - 7:00PM";
  datesOfCheckbox[6][0] = sun + "10:00AM - 2:00PM & 3:00PM - 7:00PM";

  datesOfCheckbox[0][1] = mon + "11:00AM - 3:00PM & 4:00PM - 8:00PM";
  datesOfCheckbox[1][1] = tues + "11:00AM - 3:00PM & 4:00PM - 8:00PM";
  datesOfCheckbox[2][1] = wed + "11:00AM - 3:00PM & 4:00PM - 8:00PM";
  datesOfCheckbox[3][1] = thur + "11:00AM - 3:00PM & 4:00PM - 8:00PM";
  datesOfCheckbox[4][1] = fri + "11:00AM - 3:00PM & 4:00PM - 8:00PM";
  datesOfCheckbox[5][1] = sat + "11:00AM - 3:00PM & 4:00PM - 8:00PM";
  datesOfCheckbox[6][1] = sun + "11:00AM - 3:00PM & 4:00PM - 8:00PM";

  datesOfCheckbox[0][2] = mon + "12:00PM - 4:00PM & 5:00PM - 9:00PM";
  datesOfCheckbox[1][2] = tues + "12:00PM - 4:00PM & 5:00PM - 9:00PM";
  datesOfCheckbox[2][2] = wed + "12:00PM - 4:00PM & 5:00PM - 9:00PM";
  datesOfCheckbox[3][2] = thur + "12:00PM - 4:00PM & 5:00PM - 9:00PM";
  datesOfCheckbox[4][2] = fri + "12:00PM - 4:00PM & 5:00PM - 9:00PM";
  datesOfCheckbox[5][2] = sat + "12:00PM - 4:00PM & 5:00PM - 9:00PM";
  datesOfCheckbox[6][2] = sun + "12:00PM - 4:00PM & 5:00PM - 9:00PM";

  datesOfCheckbox[0][3] = mon + "1:00PM - 5:00PM & 6:00PM - 10:00PM";
  datesOfCheckbox[1][3] = tues + "1:00PM - 5:00PM & 6:00PM - 10:00PM";
  datesOfCheckbox[2][3] = wed + "1:00PM - 5:00PM & 6:00PM - 10:00PM";
  datesOfCheckbox[3][3] = thur + "1:00PM - 5:00PM & 6:00PM - 10:00PM";
  datesOfCheckbox[4][3] = fri + "1:00PM - 5:00PM & 6:00PM - 10:00PM";
  datesOfCheckbox[5][3] = sat + "1:00PM - 5:00PM & 6:00PM - 10:00PM";
  datesOfCheckbox[6][3] = sun + "1:00PM - 5:00PM & 6:00PM - 10:00PM";

  const submit = () => {
    const a = [0, 1, 2, 3, 4];
    const b = [1, 2, 3, 4, 5];
    const c = [2, 3, 4, 5, 6];
    var ans = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 4; j++) {
        if (sched[i][j].check) {
          ans.push(i);
        }
      }
    }
    console.log(ans);
    if (
      JSON.stringify(ans) === JSON.stringify(a) ||
      JSON.stringify(ans) === JSON.stringify(b) ||
      JSON.stringify(ans) === JSON.stringify(c)
    ) {
      console.log("yes");
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 4; j++) {
          if (sched[i][j].check) {
            const date = sched[i][j].date;
            const id = authenticationService.currentUserValue.id;
            if (j == 0) {
              riderService
                .entershift(id, date, " 10:00", " 14:00")
                .then((response) => {
                  response.json((data) => {
                    console.log("donezo");
                  });
                });
              riderService
                .entershift(id, date, " 15:00", " 19:00")
                .then((response) => {
                  response.json((data) => {
                    console.log("donezo");
                  });
                });
            }
            if (j === 1) {
              riderService
                .entershift(id, date, " 11:00", " 15:00")
                .then((response) => {
                  response.json((data) => {
                    console.log("donezo");
                  });
                });
              riderService
                .entershift(id, date, " 16:00", " 20:00")
                .then((response) => {
                  response.json((data) => {
                    console.log("donezo");
                  });
                });
            }
            if (j === 2) {
              riderService
                .entershift(id, date, " 12:00", " 16:00")
                .then((response) => {
                  response.json((data) => {
                    console.log("donezo");
                  });
                });
              riderService
                .entershift(id, date, " 17:00", " 21:00")
                .then((response) => {
                  response.json((data) => {
                    console.log("donezo");
                  });
                });
            }
            if (j === 3) {
              riderService
                .entershift(id, date, " 13:00", " 17:00")
                .then((response) => {
                  response.json((data) => {
                    console.log("donezo");
                  });
                });
                riderService
                .entershift(id, date, " 18:00", " 22:00")
                .then((response) => {
                  response.json((data) => {
                    console.log("donezo");
                  });
                });
            }
          }
        }
        window.location.reload(false);
      }
    } else {
      console.log("no");
      setError(true);
      setMsg(
        "You have to select only one slot for exacrtly 5 consecutive days"
      );
    }
  };

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
                  <TableCell>10:00AM - 2:00PM & 3:00PM - 7:00PM</TableCell>
                  <TableCell>11:00AM - 3:00PM & 4:00PM - 8:00PM</TableCell>
                  <TableCell>12:00PM - 4:00PM & 5:00PM - 9:00PM</TableCell>
                  <TableCell>1:00PM - 5:00PM & 6:00PM - 10:00PM</TableCell>
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
