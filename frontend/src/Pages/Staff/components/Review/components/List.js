import React, { useState, useEffect } from "react";
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
import { restaurantService, authenticationService } from "../../../../../services"
import ListData from "./ListData"

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

const List = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [reviews] = useState(mockData);

  const [order] = useState(props.orderid);

  const [review, setReviews] = useState([]);

  useEffect(() => {
    console.log(authenticationService.currentUserValue)
    restaurantService.getRestaurantReviews(authenticationService.currentUserValue.restaurantid).then((response) => {
      response.json().then((data) => {
        console.log("omooooo: ", restaurantService.reviewResults(data))
          setReviews( restaurantService.reviewResults(data) );
      })
  })
  }, []) 

  /**** Fetch the reviews for the driver

  let reviews;
  const url = 'api/v1/...';

  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    reviews = JSON.parse(result);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

  ****/

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Reviews" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Date Ordered</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {review.map((review) => (
                  <ListData itemid={review.itemid} rating={review.rating} comments={review.reviews} orderid={review.orderid}  />
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

List.propTypes = {
  className: PropTypes.string,
};

export default List;
