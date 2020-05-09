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
  import PerfectScrollbar from "react-perfect-scrollbar";
import { managerService } from "../../../../services"
  import NewReleasesIcon from "@material-ui/icons/NewReleases";
  import ErrorAlert from "../../../../components/Alerts/ErrorAlert/ErrorAlert"

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: this.props.start,
        end: this.props.end,
        restuarant: 0,
        customer: 0,
        orders: 0,
        cost: 0,
        nett: 0,
        success: false,
        error: false,
        msg: ""
        }
    }
    // state = {  
    //     start: this.props.start,
    //     end: this.props.end,
    //     restuarant: 0,
    //     customer: 0,
    //     orders: 0,
    //     cost: 0,
    //     nett: 0,
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.start > nextProps.end) {
            this.setState({ error: true, msg: "Start date selected cannot be after end date"})
        }
        console.log(nextProps)
        this.setState({ start: nextProps.start, end: nextProps.end })
        managerService.newrestaurantcount(this.state.start, this.state.end).then((response) => {
            response.json().then((data) => {
                this.setState({ restuarant: data.count })
            })
        })
        
        managerService.newcustomercount(this.state.start, this.state.end).then((response) => {
            response.json().then((data) => {
                this.setState({ customer: data.count })
            })
        })
        
        managerService.orderscount(this.state.start, this.state.end).then((response) => {
            response.json().then((data) => {
                this.setState({ orders: data.count })
            })
        })
        
        managerService.totalfoodcost(this.state.start, this.state.end).then((response) => {
            response.json().then((data) => {
                this.setState({ cost: data.sum })
            })
        })
        
        managerService.totalnett(this.state.start, this.state.end).then((response) => {
            response.json().then((data) => {
                this.setState({ nett: data.sum })
            })
        })
        
    }

    render() { 
        return (  
            <Card >
            <CardHeader title="New" />
            <Divider />
            <CardContent >
              <PerfectScrollbar>
                <div >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                      <TableCell  align="center">No. of Restaurants</TableCell>
                        <TableCell align="center">No. of New Customers</TableCell>
                        <TableCell align="center">No. of Orders</TableCell>
                        <TableCell align="center">Total Food Cost</TableCell>
                        <TableCell align="center">Total Nett</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow >
                          <TableCell align="center">{this.state.restuarant}</TableCell>
                          <TableCell align="center">{this.state.customer}</TableCell>
                          <TableCell align="center">{this.state.orders}</TableCell>
                          <TableCell align="center">${this.state.cost}</TableCell>
                          <TableCell align="center">${this.state.nett}</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </PerfectScrollbar>
            </CardContent>
            <Divider />
            {this.state.error && ErrorAlert(this.state.msg)}

          </Card>
        );
    }
}
 
export default OrderSummary;