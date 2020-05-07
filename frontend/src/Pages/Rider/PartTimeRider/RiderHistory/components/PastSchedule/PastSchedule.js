import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
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

import mockData from "./data";

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

const PastScheduleList = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [schedules] = useState(mockData);

  /** REPLACE THE DATA COMING FROM BACKEND
  const schedules = props.schedules;
  **/

  return (
    <Card {...rest}>
      <CardHeader title="Past Work Schedule" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow hover key={schedule.id}>
                    <TableCell>{schedule.start}</TableCell>
                    <TableCell>{schedule.end}</TableCell>
                    <TableCell>{schedule.day}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

PastScheduleList.propTypes = {
  className: PropTypes.string,
};

export default PastScheduleList;
