import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import EditPromo from "./EditPromotion";
import { makeStyles } from "@material-ui/core/styles";
import PastPromotionInfo from './PastPromotionInfo';
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

const Cpromo = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [promotions] = useState(props.promotions);

  // useEffect(() => {
  //   setPromotions(props.promotions)
  // })

  // console.log('map???', promotions);
  const [info, setInfo] = useState({
    promotionid: null,
    start: null,
    end: null,
    min: null,
    discount: null,
    freedelivery: null
  })

  const [orders] = useState(props.data);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState("");

  console.log('what the flying fuck', props.promotions);

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
      <CardHeader title="Past Promotions" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Promotion ID</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Minimum Spending Required $</TableCell>
                  <TableCell>Discount %</TableCell>
                  <TableCell>Free Delivery</TableCell>
                  {/* <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.promotions.map((promotion, index) => (
                  <PastPromotionInfo key={index} promotionid={promotion} />
                ))}
              </TableBody>
            </Table>
          </div>
          {openEdit && <EditPromo data={editData} onClick={handleEdit} />}
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

Cpromo.propTypes = {
  className: PropTypes.string,
};

export default Cpromo;
