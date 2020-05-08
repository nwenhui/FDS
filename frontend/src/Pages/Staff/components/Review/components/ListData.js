import React, { Component } from 'react';
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
import { authenticationService, customerService, restaurantService } from '../../../../../services'

class ListData extends Component {
    state = {  
        orderid: this.props.orderid,
        itemid: this.props.itemid,
        itemname: null,
        date: null,
        rating: this.props.rating, 
        comments: this.props.comments,
    }

    componentDidMount() {
        // restaurantService.getRestaurantReviews(authentication.currentUserValue.resid).then((response) => {
        //     response.json().then((data) => {
        //         this.setState({ reviews: restaurantService.reviewResults(data) });
        //     })
        // })
        // customerService.getReview(this.state.orderid, this.state.itemid).then((response) => {
        //     response.json().next((data) => {
        //         this.setState({ rating: data.rating, connents: data.review })
        //     })
        // })
        restaurantService.getFood(this.props.itemid).then((response) => {
            response.json().then((data) => {
                this.setState({ itemname: data.itemname })
            })
        }) 
        restaurantService.getOrderDate(this.props.orderid).then((response) => {
            response.json().then((data) => {
                this.setState({ date: data.ordered_on.substring(0,10) });
            })
        })
    }

    render() { 
        return (  
            <TableRow>
            <TableCell>{this.state.itemname}</TableCell>
            <TableCell>{this.state.date}</TableCell>
            <TableCell>{this.state.rating} / 5</TableCell>
            <TableCell>{this.state.comments}</TableCell>
          </TableRow>
        );
    }
}
 
export default ListData;