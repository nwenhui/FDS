import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Editing from "./Editing";
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
} from "@material-ui/core";

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

const RatingTable = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [orders] = useState(props.data);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState("");

  const handleClick = (orders) => {
    setEditData(orders);
    setOpenEdit(true);
  };

  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };

  // QUERY: DELETE
  const handleDelete = (riderID) => {
    console.log(riderID);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Delivery Ratings (Edit)" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rider</TableCell>
                  <TableCell>Food</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow>
                    <TableCell>{order.ridername}</TableCell>
                    <TableCell>
                      <ol>
                        {order.food.map((item) => {
                          return <li>{item}</li>;
                        })}
                      </ol>
                    </TableCell>{" "}
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.payment}</TableCell>
                    <TableCell>{order.drating}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <EditIcon onClick={() => handleClick(order)} />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon onClick={() => handleDelete(order.ref)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {openEdit && <Editing data={editData} onClick={handleEdit} />}
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

RatingTable.propTypes = {
  className: PropTypes.string,
};

export default RatingTable;
