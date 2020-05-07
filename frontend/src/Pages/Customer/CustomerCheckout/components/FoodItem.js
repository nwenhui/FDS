import React, { useState, useEffect } from "react";
import clsx from "clsx";
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
} from "@material-ui/core";
import { Tab } from "react-bootstrap";
// import FoodItemInfo from './FoodItemInfo'
import { orderService,restaurantService } from "../../../../services"

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
    // marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const FoodItem = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [items] = useState(props.data);
  const [resid] = useState(props.resid);
  const [resname, setResname] = useState("");

  /*
  const items = props.data;
  */

  useEffect(() => {
    restaurantService.getRestaurantName(props.resid).then((response) => {
      console.log('response?? : ', response)
      response.json().then((data) => {
        console.log('omo data: ', data.resname);
        setResname(data.resname);
      })
    })
  })

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Your cart" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Restuarant:</TableCell>
                  <TableCell>{resname}</TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell style={{ valign: "top" }}>Item name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{item.oid}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.discounted}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions} />
    </Card>
  );
};

FoodItem.propTypes = {
  className: PropTypes.string,
};

export default FoodItem;
