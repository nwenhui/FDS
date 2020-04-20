import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import mockData from "./data";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopWidth: 0.5,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderColor: "grey",
    borderStyle: "solid",
  },
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

const PastOrders = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [orders] = useState(mockData);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      {/* <CardHeader action={""} title="Past Orders" />
      <Divider /> */}
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <CardHeader
              border="max-width: 18rem;"
              action={""}
              title="Past Orders"
            />
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Ref</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Food Item</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Order Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.ref}</TableCell>
                    <TableCell>{order.restaurant}</TableCell>
                    <TableCell>
                      <ol>
                        {order.food.map((item) => {
                          return <li>{item}</li>;
                        })}
                      </ol>
                    </TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.payment}</TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      {/* <CardActions className={classes.actions}></CardActions> */}
    </Card>
  );
};

PastOrders.propTypes = {
  className: PropTypes.string,
};

export default PastOrders;
