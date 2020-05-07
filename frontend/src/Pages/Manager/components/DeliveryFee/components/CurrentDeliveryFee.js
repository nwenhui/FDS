import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditDeliveryFee from "./EditDeliveryFee";
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
  Button,
  IconButton,
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
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const CurrentDeliveryFee = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [delivery] = useState(props.data);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState("");

  const handleClick = (deliveryfee) => {
    setEditData(deliveryfee);
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
      <CardHeader title="Delivery Fees" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Restaurant ID</TableCell>
                  <TableCell>Restaurant Name</TableCell>
                  <TableCell>Delivery Fee</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {delivery.map((deliveryfee) => (
                  <TableRow hover key={deliveryfee.id}>
                    <TableCell>{deliveryfee.restaurant_id}</TableCell>
                    <TableCell>{deliveryfee.restaurant_name}</TableCell>
                    <TableCell>{deliveryfee.fee}</TableCell>
                    <TableCell>
                      <IconButton
                        //color="primary"
                        size="small"
                        onClick={() => handleClick(deliveryfee)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        //color="primary"
                        size="small"
                        onClick={() => handleDelete(deliveryfee.restaurant_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {openEdit && <EditDeliveryFee data={editData} onClick={handleEdit} />}
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

CurrentDeliveryFee.propTypes = {
  className: PropTypes.string,
};

export default CurrentDeliveryFee;
