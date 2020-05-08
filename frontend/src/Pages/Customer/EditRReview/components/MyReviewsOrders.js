import React, { Component } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
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
} from "@material-ui/core";
import { authenticationService, customerService } from "../../../../services"
import MyReviewsOrdersInfo from "./MyReviewsOrdersInfo"


class MyReviewsOrders extends Component {
    state = {  
        orderid: this.props.orderid,
        resname: null,
        items: [],
        date: null,
    }

    componentDidMount() {
        customerService.orderFood(this.state.orderid).then((response) => {
            response.json().then((data) => {
                console.log('items: ', customerService.customerOrderItems(data))
                this.setState({ items: customerService.customerOrderItems(data) }, () => {console.log(this.state.items)})
            })
        })
        customerService.orderInformation(this.state.orderid).then((response) => {
            response.json().then((data) => {
                this.setState({ date: data.ordered_on.substring(0,10) })
            })
        })
        customerService.orderRestaurant(this.state.orderid).then((response) => {
            console.log('hello over here')
            response.json().then((data) => {
                console.log('resname: ', data)
                this.setState({ resname: data.resname })
            })
        })
    }

    render() { 
        return (  
            <TableRow>
                {this.state.items.map((item, index) => (
                    <MyReviewsOrdersInfo key={index} itemid={item.itemid} orderid={this.state.orderid} resname={this.state.resname} date={this.state.date} />
                ))}
            </TableRow>
        );
    }
}
 
export default MyReviewsOrders;