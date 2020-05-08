import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Button, TableCell } from '@material-ui/core';

import SuccessAlert from "../../../../components/Alerts/SuccessAlert/SuccessAlert"
import ErrorAlert from "../../../../components/Alerts/ErrorAlert/ErrorAlert"

import { restaurantService } from '../../../../services';
import { orderService } from '../../../../services';

class CartInfo extends Component {
    state = {  
        itemid: this.props.itemid,
        name: "",
        price: 0,
        qty: this.props.qty,
        availabile: 0,
        restaurant: "",
        resid:0,
        error: false,
        succes: false,
        errorMessage: "",
        successMessage: "",
        subtotal: 0
    }

    fetchData() {
        restaurantService.getFood(this.state.itemid).then((response) => {
            response.json()
                .then((data) => {
                    console.log(' stuff hehe', data.itemid);
                    this.setState({ name: data.itemname, price: data.cost }, () => {
                        restaurantService.getFoodAvailability(this.state.itemid).then((response) => {
                            response.json()
                                .then((data) => {
                                    console.log(' stuff hehe', data.itemid);
                                    this.setState({ availabile: data.amt_available }, () => {
                                        this.setState({ subtotal: this.state.price * this.state.qty }, () => {
                                            console.log('subtotal:', this.state.subtotal)
                                            orderService.addToTotal(this.state.subtotal);
                                        })
                                    });
                                })
                        })
                    });
                })
        })
        restaurantService.getRestaurantFromFood(this.state.itemid).then((response) => {
            response.json()
            .then((data) => {
                console.log('hehehehehehe', data)
                this.setState({ restaurant: data.resname, resid: data.resid }, () => {console.log('item res:', this.state.resid)})
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

    handleUpdateCart() {
        console.log('helloooo');
        let cart = 0;
        try {
            cart = orderService.updateCart(this.state.itemid, this.state.qty, this.state.price);
            this.setState({ error: false, success: true, successMessage: "You have updated " + this.state.name + " in your cart." });
        } catch (error) {
            // error.text().then((errorMessage) => {
                this.setState({ error: true, success: false, errorMessage: error });
            // })
        }
        window.location.reload(false);
    }
    
    handleRemoveItem() {
        console.log('helloooo');
        let cart = 0;
        try {
            cart = orderService.removeFromCart(this.state.itemid);
            this.setState({ error: false, success: true, successMessage: "You have removed " + this.state.name + " in your cart. You now have " + cart + " item(s) in your cart." });
        } catch (error) {
            // error.text().then((errorMessage) => {
                this.setState({ error: true, success: false, errorMessage: error });
            // })
        }
        window.location.reload(false);
    }

    render() { 
        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    {this.state.name}
                </TableCell>
                <TableCell align="center">${this.state.price}</TableCell>         
                <TableCell align="center">
                    <Button onClick={() => this.handleRemove()}><RemoveCircleIcon/></Button> 
                    {this.state.qty}
                    <Button onClick={() => this.handleAdd()}><AddCircleIcon/></Button>
                </TableCell>
                <TableCell align="center">${this.state.subtotal}</TableCell>
                {this.state.qty > 0 && 
                <TableCell align="right">
                    <Button variant="contained" color="secondary" onClick={() => this.handleUpdateCart()}>Update Cart</Button>
                </TableCell>}
                {this.state.qty == 0 && 
                <TableCell align="right">
                    <Button variant="contained" color="secondary" onClick={() => this.handleRemoveItem()}>Remove Item</Button>
                </TableCell>}
                {this.state.error && ErrorAlert(this.state.errorMessage)}
                {this.state.success && SuccessAlert(this.state.successMessage)}
            </TableRow>
        );
    }
}
 
export default CartInfo;