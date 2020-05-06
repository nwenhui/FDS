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
    Button,
    IconButton,
  } from "@material-ui/core";
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import { restaurantService } from "../../../../../services";
  

class CurrentPromotionInfo extends Component {
    state = {  
        promotionid: this.props.promotionid,
        start: null,
        end: null,
        min: null,
        disc: null,
        freedeli: null,
    }

    fetchData() {
        restaurantService.getPromotionInformation(this.state.promotionid).then((response) => {
            response.json()
            .then((data) => {
                this.setState({ start: data.startdate, end: data.enddate, min: data.minspending, disc: data.percentageoff, freedeli: data.freedelivery }, () => {
                    console.log('promo: ', this.state.start)
                });
            })
        })
    }

    componentDidMount() {
        console.log('hi?????', this.state.promotionid);
        this.fetchData();
    }

    handleEdit() {

    }

    handleDelete() {}

    render() { 
        return (  
            <TableRow>
                    <TableCell>{this.state.promotionid}</TableCell>
                    <TableCell>{this.state.start}</TableCell>
                    <TableCell>{this.state.end}</TableCell>
                    <TableCell>{this.state.min}</TableCell>
                    <TableCell>{this.state.disc}</TableCell>
                    <TableCell>{this.state.freedeli ? <CheckTwoToneIcon /> : <ClearTwoToneIcon />}</TableCell>
                    <TableCell>
                      <IconButton
                        //color="primary"
                        size="small"
                        onClick={() => this.handleEdit()}
                      >
                        <EditIcon />
                      </IconButton>
                      {/* <EditIcon onClick={() => handleClick(order)} /> */}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        //color="primary"
                        size="small"
                        onClick={() => this.handleDelete()}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
        );
    }
}
 
export default CurrentPromotionInfo;