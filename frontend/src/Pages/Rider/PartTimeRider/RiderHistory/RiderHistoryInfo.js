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
    Tooltip,
    TableSortLabel,
  } from "@material-ui/core";

class RiderHistoryInfo extends Component {
    state = {  
        start: this.props.start,
        end: this.props.end,
    }
 
    componentDidMount() {

    }
    
    render() { 
        return (  
            <TableRow>
            <TableCell>{this.state.start}</TableCell>
            <TableCell>{this.state.end}</TableCell>
          </TableRow>
        );
    }
}
 
export default RiderHistoryInfo;