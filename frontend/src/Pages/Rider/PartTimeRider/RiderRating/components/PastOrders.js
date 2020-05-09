import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AddPromo from "./AddPromo.js";
import {
  Button,
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
import PastOrderInfo from "./PastOrderInfo"

const useStyles = makeStyles((theme) => ({
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
  // const [orders] = useState(props.data);
  const [openDiv, setOpenDiv] = useState(false);

  const handleOpenDiv = () => {
    setOpenDiv(!openDiv);
  };
console.log(props.orders)
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <CardHeader
              border="max-width: 18rem;"
              action={""}
              title="Past Deliveries"
            />
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>Payment Method</TableCell>
                  {/* <TableCell>Promotion Applied</TableCell>
                  <TableCell>Used Points</TableCell> */}
                  <TableCell>Date Ordered</TableCell>
                  <TableCell>Rating</TableCell>
                  {/* <TableCell>Rate Delivery</TableCell>
                  <TableCell>Review Items</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.orders.map((order) => (
                  <PastOrderInfo orderid={order.orderid} rates={order.rating}/>
                  // <TableRow>
                  //   <TableCell>{order.restaurant}</TableCell>
                  //   <TableCell>
                  //     <ol>
                  //       {order.food.map((item) => {
                  //         return <li>{item}</li>;
                  //       })}
                  //     </ol>
                  //   </TableCell>
                  //   <TableCell>{order.price}</TableCell>
                  //   <TableCell>{order.payment}</TableCell>
                  //   <TableCell>{order.date}</TableCell>
                  //   <TableCell>
                  //     <Button
                  //       color="secondary"
                  //       size="small"
                  //       variant="contained"
                  //       onClick={handleOpenDiv}
                  //     >
                  //       Add Review
                  //     </Button>
                  //   </TableCell>
                  // </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {openDiv && <AddPromo onClick={handleOpenDiv} />}
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

PastOrders.propTypes = {
  className: PropTypes.string,
};

export default PastOrders;
