import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { Grid } from "@material-ui/core";

import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import data from "./data";

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
  const [items] = useState(data.foodItem);

  let init = Array(items.length).fill(0);
  const [tempSelectedItems, setItems] = useState(init);

  console.log(init);
  console.log(tempSelectedItems);

  /**
  const items = props.data; (passed down from CustomerSearch)
  **/

  // const tempSelectedItems = [];

  const handleAdd = (id) => {
    console.log(id);
    let items = [...tempSelectedItems];
    console.log(items);
    let item = items[id];
    console.log(item);

    item += 1;
    items[id] = item;

    setItems(items);
    /*
    let notAdded = true;
    for(let i = 0; i < tempSelectedItems.length; i++) {
      if (tempSelectedItems[i].id == id) {
        tempSelectedItems[i].count += 1;
        notAdded = false;
        break;
      }
    }
    if(notAdded) {
      tempSelectedItems.push({id: id, count: 1});
    }
    console.log(tempSelectedItems)
    */
  };

  const handleRemove = (id) => {
    console.log(id);
    let items = [...tempSelectedItems];
    console.log(items);
    let item = items[id];
    console.log(item);

    if (item > 0) {
      item -= 1;
    }
    items[id] = item;

    setItems(items);
    /*
    for(let i = 0; i < tempSelectedItems.length; i++) {
      if (tempSelectedItems[i].id == id) {
        if(tempSelectedItems[i].count > 0) tempSelectedItems[i].count -= 1;
        break
      }
    }
    console.log(tempSelectedItems)
    */
  };

  // trigger
  const handleAddtoCart = () => {
    /**** Upload the order data to the backend ****

    const data = tempSelectedItems;
    const url = 'api/v1/...';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(() => {
      console.log('Success!');
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

    ****/
    console.log(tempSelectedItems);
    alert("Order has been placed!");
  };

  return (
    <Grid container justify="center">
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title={props.restaurantname} />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ valign: "top" }}>Food Item</TableCell>
                    <TableCell>Original Price</TableCell>
                    <TableCell>Discounted Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, i) => (
                    <TableRow hover key={i}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.discounted}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleRemove(i)}>
                          <RemoveCircleIcon />
                        </Button>
                        {tempSelectedItems[i]}
                        <Button onClick={() => handleAdd(i)}>
                          <AddCircleIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddtoCart}
              >
                Add to Cart
              </Button>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions} />
      </Card>
    </Grid>
  );
};

FoodItem.propTypes = {
  className: PropTypes.string,
};

export default FoodItem;
