import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
  IconButton,
} from "@material-ui/core";
import EditFood from "./EditFood";
//import mockData from "./data";

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

const FoodItem = (props) => {
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
  const handleDelete = (fid) => {
    console.log(fid);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Food Items" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Food Item ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Original Price</TableCell>
                  <TableCell>Discounted Price</TableCell>
                  <TableCell>Daily Limit</TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.fid}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.original}</TableCell>
                    <TableCell>{order.discounted}</TableCell>
                    <TableCell>{order.dailyLimit}</TableCell>
                    <TableCell>
                      {order.categories.map((category) => {
                        return <li>{category}</li>;
                      })}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleClick(order)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        //color="primary"
                        size="small"
                        onClick={() => handleDelete(order.fid)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {openEdit && <EditFood data={editData} onClick={handleEdit} />}
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

FoodItem.propTypes = {
  className: PropTypes.string,
};

export default FoodItem;
