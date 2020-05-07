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

const CustomerData = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [customers] = useState(mockData);

  /*
  const customers = props.data;
  */

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Customer Info" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Total Number of Orders</TableCell>
                  <TableCell>Total Profit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow hover key={customer.id}>
                    <TableCell>{customer.custid}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.numOrders}</TableCell>
                    <TableCell>{customer.profit}</TableCell>
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

CustomerData.propTypes = {
  className: PropTypes.string,
};

export default CustomerData;
