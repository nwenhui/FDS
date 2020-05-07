import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Button, TableCell } from '@material-ui/core';

import SuccessAlert from "../../../../../components/Alerts/SuccessAlert/SuccessAlert"
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert"

import { restaurantService } from '../../../../../services';
import { orderService } from '../../../../../services';

class MenuRow extends Component {
    state = {  
        itemid: this.props.itemid,
        name: "",
        price: 0,
        qty: 0,
        availabile: 0,
    }

    fetchData() {
        restaurantService.getFood(this.state.itemid).then((response) => {
            response.json()
                .then((data) => {
                    console.log(' stuff hehe', data.itemid);
                    this.setState({ name: data.itemname, price: data.cost });
                })
        })
        restaurantService.getFoodAvailability(this.state.itemid).then((response) => {
            response.json()
                .then((data) => {
                    console.log(' stuff hehe', data.itemid);
                    this.setState({ availabile: data.amt_available });
                })
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    handleRemove() {
        const qty = this.state.qty;
        if (qty > 0) {
            this.setState({ qty: qty-1 });
        } 
    }

    handleAdd() {
        const qty = this.state.qty;
        if (qty < this.state.availabile) {
            this.setState({ qty: qty+1 });
        } 
    }

    // handleAddtoCart() {
    //     console.log('helloooo')
    //     orderService.addToCheckOut(this.state.itemid, this.state.qty, this.state.price);
    // }

    render() { 
        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    {this.state.name}
                </TableCell>
                <TableCell align="center">${this.state.price}</TableCell>
                {/* <TableCell align="center">{this.state.availabile}</TableCell>            
                <TableCell align="center">
                    <Button onClick={() => this.handleRemove()}><RemoveCircleIcon/></Button> 
                    {this.state.qty}
                    <Button onClick={() => this.handleAdd()}><AddCircleIcon/></Button>
                </TableCell>
                <TableCell align="right">
                    <Button variant="contained" onClick={() => this.handleAddtoCart()}>Add to Cart</Button>
                </TableCell> */}
            </TableRow>
        );
    }
}
 
export default MenuRow;