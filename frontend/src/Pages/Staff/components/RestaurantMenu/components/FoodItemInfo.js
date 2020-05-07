import React, { Component } from 'react';
import { restaurantService } from "../../../../../services";
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Form, Alert } from "react-bootstrap";
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
import EditFoodDialog from "./EditFoodDialog"

class FoodItemInfo extends Component {
    state = {  
        itemid: this.props.itemid,
        name: null,
        price: null,
        amt_avail: null,
        limit: null,
        available: null,
        categories: [],
        edit: false,
    }

    fetchData() {
        restaurantService.getFood(this.state.itemid).then((response) => {
            response.json()
            .then((data) => {
                this.setState({ price: data.cost, limit: data.maxlimit, name: data.itemname });
            })
        })
        restaurantService.getFoodAvailability(this.state.itemid).then((response) => {
            response.json()
                .then((data) => {
                    console.log(' stuff hehe', data);
                    this.setState({ amt_avail: data.amt_available, available: data.available });
                })
        })
        restaurantService.getFoodCategory(this.state.itemid).then((response) => {
            response.json()
            .then((data) => {
                console.log(data);
                this.setState({ categories: restaurantService.foodCategoryResults(data) }, ( ) => {console.log(this.state.categoris)});
            })
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    handleDelete() {
        restaurantService.deleteFood(this.state.itemid).then((response) => {
            response.json()
            .then((data) => {
                console.log('deleto')
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
        })
    }

    handleEdit() {
        if (this.state.edit) {
            this.setState({ edit: false });
        } else {
            this.setState({ edit: true });
        }
    }


    render() { 
        return ( 
        <TableRow>
            <TableCell>{this.state.name}</TableCell>
            <TableCell>{this.state.price}</TableCell>
            <TableCell>{this.state.amt_avail}</TableCell>
            <TableCell>{this.state.limit}</TableCell>
            <TableCell>
              {this.state.categories.map((category) => {
                return <li>{category}</li>;
              })}
            </TableCell>
            <TableCell>{this.state.available ? <CheckTwoToneIcon /> : <ClearTwoToneIcon />}</TableCell>
            <TableCell>
              <IconButton
                //color="primary"
                size="small"
                onClick={() => this.handleEdit()}
              >
                <EditIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton
                //color="primary"
                size="small"
                onClick={() => this.handleDelete()}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
            {this.state.edit && <EditFoodDialog edit={this.state.edit} itemid={this.state.itemid} />}
          </TableRow>
          );
    }
}
 
export default FoodItemInfo;