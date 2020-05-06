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
  // const [state, setState] = React.useState({
  //   gilad: true,
  //   jason: false,
  //   antoine: false,
  // });

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  const week = Array(7).fill(false).map(x => Array(12).fill(false))

  const [sched, setSched] = useState(week);

  const handleChange = (index, slot, event) => {
    const update = [...sched];
    update[index][slot] = event.target.checked;
    setSched(update);
    console.log(update);
  }

  // const {
  //   slot1,
  //   slot2,
  //   slot3,
  //   slot4,
  //   slot5,
  //   slot6,
  //   slot7,
  //   slot8,
  //   slot9,
  //   slot10,
  //   slot11,
  //   slot12,
  // } = state;
  // const error =
  //   [
  //     slot1,
  //     slot2,
  //     slot3,
  //     slot4,
  //     slot5,
  //     slot6,
  //     slot7,
  //     slot8,
  //     slot9,
  //     slot10,
  //     slot11,
  //     slot12,
  //   ].filter((v) => v).length < 2;

  /*testing*/
  return (
    <Card {...rest}>
      <CardHeader title="Submit Work Schedule" />
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

                  {/* <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule, index) => (
                  <TableRow hover key={index} >
                    <TableCell>{schedule.day}</TableCell>

                    <TableCell align="center">
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={slot1}
                              checked={sched[index][0]}
                              onChange={(e) => handleChange(index,0,e)}
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
                              // checked={slot2}
                              checked={sched[index][1]}
                              onChange={(e) => handleChange(index,1,e)}
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
                              // checked={slot3}
                              checked={sched[index][2]}
                              onChange={(e) => handleChange(index,2,e)}
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
                              // checked={slot4}
                              checked={sched[index][3]}
                              onChange={(e) => handleChange(index,3,e)}
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
                              // checked={slot5}
                              checked={sched[index][4]}
                              onChange={(e) => handleChange(index,4,e)}
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
                              // checked={slot6}
                              checked={sched[index][5]}
                              onChange={(e) => handleChange(index,5,e)}
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
                              // checked={slot7}
                              checked={sched[index][6]}
                              onChange={(e) => handleChange(index,6,e)}
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
                              // checked={slot8}
                              checked={sched[index][7]}
                              onChange={(e) => handleChange(index,7,e)}
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
                              // checked={slot9}
                              checked={sched[index][8]}
                              onChange={(e) => handleChange(index,8,e)}
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
                              // checked={slot9}
                              checked={sched[index][9]}
                              onChange={(e) => handleChange(index,9,e)}
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
                              // checked={slot11}
                              checked={sched[index][10]}
                              onChange={(e) => handleChange(index,10,e)}
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
                              // checked={slot12}
                              checked={sched[index][11]}
                              onChange={(e) => handleChange(index,11,e)}
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
        <Button color="primary" variant="contained">
          Save details
        </Button>
      </CardActions>
    </Card>
  );
};

AvailableSchedule.propTypes = {
  className: PropTypes.string,
};

export default AvailableSchedule;
