import React, { Component } from 'react';
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
  import { restaurantService } from "../../../../services"

class MyReviewsOrdersInfo extends Component {
    state = {  
        orderid: this.props.orderid,
        itemid: this.props.itemid,
        itemname: "",
        resname: this.props.resname,
        date: this.props.date,
        price: 0,
        rating: 0,
        review: ""
    }

    componentDidMount() {
        restaurantService.getFood(this.state.itemid).then((response) => [
            response.json().then((data) => {
                this.setState({ price: data.cost, itemname: data.itemname })
            })
        ])
    }
    
    handleEdit = (event) => {

    }

    handleDelete = (event) => {
        
    }

    render() { 
        return (  
            <div>
                 <TableCell>{this.state.resname}</TableCell>
                <TableCell>{this.state.itemname}</TableCell>
                <TableCell>{this.state.price}</TableCell>
                <TableCell>{this.state.rating}</TableCell>
                <TableCell>{this.state.review}</TableCell>
                <TableCell>{this.state.date}</TableCell>
                <TableCell>
                <EditIcon onClick={this.handleEdit.bind(this)} />
                </TableCell>
                <TableCell>
                    <DeleteIcon onClick={this.handleDelete.bind(this)} />
                </TableCell>
            </div>
        );
    }
}
 
export default MyReviewsOrdersInfo;