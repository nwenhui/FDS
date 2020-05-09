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
  import DeliverySummaryInfo from './DeliverySummaryInfo'

class DeliverySummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: this.props.start,
        end: this.props.end,
        locations: [],
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
        this.setState({ start: nextProps.start, end: nextProps.end })
        console.log(nextProps)
        managerService.locations(this.state.start, this.state.end).then((response) => {
            response.json().then((data) => {
                console.log('locations: ', this.state.locations)
                this.setState({ locations: managerService.locationsresults(data) }, () => {
                    console.log('locations: ', managerService.locationsresults(data))
                })
        })
    })
}

    render() { 
        return (  
            <Card >
            <CardHeader title="Delivery Info" />
            <Divider />
            <CardContent >
              <PerfectScrollbar>
                <div >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                      <TableCell  align="center">Location</TableCell>
                        <TableCell align="center">1000-1100</TableCell>
                        <TableCell align="center">1100-1200</TableCell>
                        <TableCell align="center">1200-1300</TableCell>
                        <TableCell align="center">1300-1400</TableCell>
                        <TableCell align="center">1400-1500</TableCell>
                        <TableCell align="center">1500-1600</TableCell>
                        <TableCell align="center">1700-1800</TableCell>
                        <TableCell align="center">1800-1900</TableCell>
                        <TableCell align="center">1900-2000</TableCell>
                        <TableCell align="center">2000-2100</TableCell>
                        <TableCell align="center">2100-2200</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.locations.map((location) => (
                            <h5>{location}</h5>
                            // <DeliverySummaryInfo start={this.state.start} end={this.state.end} location={location} />
                        ))}


                        {/* <TableRow >
                          <TableCell align="center">{this.state.restuarant}</TableCell>
                          <TableCell align="center">{this.state.customer}</TableCell>
                          <TableCell align="center">{this.state.orders}</TableCell>
                          <TableCell align="center">${this.state.cost}</TableCell>
                          <TableCell align="center">${this.state.nett}</TableCell>
                        </TableRow> */}
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
 
export default DeliverySummary;