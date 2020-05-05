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
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {
    slot1,
    slot2,
    slot3,
    slot4,
    slot5,
    slot6,
    slot7,
    slot8,
    slot9,
    slot10,
    slot11,
    slot12,
  } = state;
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
                {schedules.map((schedule) => (
                  <TableRow hover key={schedule.id}>
                    <TableCell>{schedule.day}</TableCell>

                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot1}
                              onChange={handleChange}
                              name="slot1"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot2}
                              onChange={handleChange}
                              name="slot2"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot3}
                              onChange={handleChange}
                              name="slot3"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot4}
                              onChange={handleChange}
                              name="slot4"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot5}
                              onChange={handleChange}
                              name="slot5"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot6}
                              onChange={handleChange}
                              name="slot6"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot7}
                              onChange={handleChange}
                              name="slot7"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot8}
                              onChange={handleChange}
                              name="slot8"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot9}
                              onChange={handleChange}
                              name="slot9"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot10}
                              onChange={handleChange}
                              name="slot10"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot11}
                              onChange={handleChange}
                              name="slot11"
                            />
                          }
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={slot12}
                              onChange={handleChange}
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
