import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditCpromo from "./EditCpromo";
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
import MyReviews from './MyReviews'

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
  actions: {
    justifyContent: "flex-end",
  },
}));

const RestaurantReview = (props) => {
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

  const handleDelete = (rid) => {
    console.log(rid);
  };

  return (
    <MyReviews />
    // <Card {...rest}>
    //   <CardHeader title="Restaurant Reviews (Edit)" />
    //   <Divider />
    //   <CardContent className={classes.content}>
    //     <PerfectScrollbar>
    //       <div className={classes.inner}>
    //         <Table>
    //           <TableHead>
    //             <TableRow>
    //               <TableCell>Restaurant</TableCell>
    //               <TableCell>Food</TableCell>
    //               <TableCell>Price</TableCell>
    //               <TableCell>Payment</TableCell>
    //               <TableCell>Rating</TableCell>
    //               <TableCell>Review</TableCell>
    //               <TableCell>Date</TableCell>
    //               <TableCell>Edit</TableCell>
    //               <TableCell>Delete</TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {orders.map((order) => (
    //               <TableRow>
    //                 <TableCell>{order.restaurant}</TableCell>
    //                 <TableCell>
    //                   <ol>
    //                     {order.food.map((item) => {
    //                       return <li>{item}</li>;
    //                     })}
    //                   </ol>
    //                 </TableCell>{" "}
    //                 <TableCell>{order.price}</TableCell>
    //                 <TableCell>{order.payment}</TableCell>
    //                 <TableCell>{order.rrating}</TableCell>
    //                 <TableCell>{order.rreview}</TableCell>
    //                 <TableCell>{order.date}</TableCell>
    //                 <TableCell>
    //                   <EditIcon onClick={() => handleClick(order)} />
    //                 </TableCell>
    //                 <TableCell>
    //                   <DeleteIcon onClick={() => handleDelete(order.ref)} />
    //                 </TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </div>
    //       {openEdit && <EditCpromo data={editData} onClick={handleEdit} />}
    //     </PerfectScrollbar>
    //   </CardContent>
    //   <Divider />
    // </Card>
  );
};

RestaurantReview.propTypes = {
  className: PropTypes.string,
};

export default RestaurantReview;
