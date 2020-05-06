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

const List = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [reviews] = useState(mockData);

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
                  <TableCell>Date</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow hover key={review.id}>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>{review.rating}/5</TableCell>
                    <TableCell>{review.comments}</TableCell>
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

List.propTypes = {
  className: PropTypes.string,
};

export default List;
