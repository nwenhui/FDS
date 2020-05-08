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
import MyReviewsOrders from "./MyReviewsOrders"

class MyReviews extends Component {
    state = {  
        id: authenticationService.currentUserValue.id,
        orders: [],
    }

    componentDidMount() {
        customerService.customerOrders(this.state.id).then((response) => {
            response.json().then((data) => {
                this.setState({ orders: customerService.customerOrdersResults(data) });
            })
        })
    }

    render() { 
        return (  
            <Card>
                <CardHeader title="Your Reviews" />
                <Divider />
                <CardContent >
                    <PerfectScrollbar>
                    <div >
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Restaurant</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Review</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.orders.map((order) => (
                                <MyReviewsOrders orderid={order} />
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                    {/* {openEdit && <EditCpromo data={editData} onClick={handleEdit} />} */}
                    </PerfectScrollbar>
                </CardContent>
                <Divider />
                </Card>
        );
    }
}
 
export default MyReviews;