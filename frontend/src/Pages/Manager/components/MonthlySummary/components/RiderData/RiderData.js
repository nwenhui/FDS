import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
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

import mockData from "./data";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const RiderData = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [riders] = useState(mockData);

  /*
  const riders = props.data;
  */

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Rider Info" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rider Name</TableCell>
                  <TableCell>Number of Delivered Orders</TableCell>
                  <TableCell>Number of Hours Worked</TableCell>
                  <TableCell>Total Salary</TableCell>
                  <TableCell>Average Delivery Time</TableCell>
                  <TableCell>Number of Ratings</TableCell>
                  <TableCell>Average Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {riders.map((rider) => (
                  <TableRow hover key={rider.id}>
                    <TableCell>{rider.name}</TableCell>
                    <TableCell>{rider.numOrders}</TableCell>
                    <TableCell>{rider.numHours}</TableCell>
                    <TableCell>{rider.salary}</TableCell>
                    <TableCell>{rider.avgTime}</TableCell>
                    <TableCell>{rider.numRatings}</TableCell>
                    <TableCell>{rider.avgRating}</TableCell>
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

RiderData.propTypes = {
  className: PropTypes.string,
};

export default RiderData;
