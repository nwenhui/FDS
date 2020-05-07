import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CartInfo from './CartInfo';
import { restaurantService, orderService } from "../../.././../services";


class Cart extends Component {
    state = { 
        checkout: [],
        resname: "",
        resid: null,
     }

     componentDidMount() {
         console.log('hello', this.props.keywords);
         orderService.currentCheckOut.subscribe((x) => {
            console.log('omo',x);
            if (x !== null) {
                this.setState({ checkout: x }, () => {console.log('checkout items: ', this.state.checkout)})
            }
          });
          orderService.currentRestaurant.subscribe((x) => {
            console.log('omo',x);
            if (x !== null) {
                this.setState({ resid: x }, () => {
                    console.log('whatthe FUCJ')
                    restaurantService.getRestaurantName(this.state.resid).then((response) => {
                        response.json().then((data) => {
                            console.log('hellodata: ', data)
                            this.setState({ resname: data.resname }, () => {console.log('results: ', this.state.resname)})
                        })
                    })
                });
            }
          });

     }

    render() { 
        return ( 
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Restauarant ordered from: </TableCell>
                                <TableCell>{this.state.resname}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item name</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Qty</TableCell>
                                <TableCell align="center"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           {this.state.checkout.map((item, index) => (
                               <CartInfo key={index} itemid={item.itemid} qty={item.qty} />
                           ))} 
                        </TableBody>
                    </Table>
                </TableContainer>
        );
    }
}
 
export default Cart;