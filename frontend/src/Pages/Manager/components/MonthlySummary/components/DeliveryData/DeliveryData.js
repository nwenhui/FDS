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

const DeliveryData = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [deliveries] = useState(mockData); //useState(props.data);

  /*
  const deliveries = props.data;
  */

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Delivery Summary" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Delivery Location</TableCell>
                  <TableCell>Total Number of Orders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow hover key={delivery.id}>
                    <TableCell>{delivery.location}</TableCell>
                    <TableCell>{delivery.numOrders}</TableCell>
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

DeliveryData.propTypes = {
  className: PropTypes.string,
};

export default DeliveryData;
