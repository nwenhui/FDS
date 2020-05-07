import React, { Component } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import { customerService } from "../../../../services"
import PastOrderPromotion from "./PastOrderPromotion";
import PastOrderItems from "./PastOrderItems"

class PastOrderInfo extends Component {
    state = {  
        orderid: this.props.orderid,
        resname: null,
        items: [],
        subtotal: null,
        ccpayment: null,
        promotion: null,
        usedpoints: null,
        date: null,
    }

    componentDidMount() {
        customerService.orderReceipt(this.state.orderid).then((response) => {
            response.json().then((data) => {
                if (data.usedpoints > 0) {
                    this.setState({ promotion: data.promotionid, subtotal: data.foodfee, usedpoints: true })
                } else {
                    this.setState({ promotion: data.promotionid, subtotal: data.foodfee, usedpoints: false }, () => {console.log('promotion: ', this.state.promotion)})
                }
            })
        })
        customerService.orderFood(this.state.orderid).then((response) => {
            response.json().then((data) => {
                console.log('items: ', customerService.customerOrderItems(data))
                this.setState({ items: customerService.customerOrderItems(data) }, () => {console.log(this.state.items)})
            })
        })
        customerService.orderInformation(this.state.orderid).then((response) => {
            response.json().then((data) => {
                this.setState({ ccpayment: data.ccpayment,  date: data.ordered_on.substring(0,10) })
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
                    <TableCell>{this.state.resname}</TableCell>
                    <TableCell>
                      <ol>
                        {this.state.items.map((item, index) => (
                            <PastOrderItems key={index} itemid={item.itemid} qty={item.qty} />
                        ))}
                      </ol>
                    </TableCell>
                    <TableCell>${this.state.subtotal}</TableCell>
                    { this.state.ccpayment ? <TableCell>credit card</TableCell> : <TableCell>cash</TableCell> }
                    { this.state.promotion ? <PastOrderPromotion promotionid={this.state.promotion} /> : <TableCell>no promotion applied</TableCell> }
                    { this.state.usedpoints ? <TableCell><CheckTwoToneIcon /></TableCell> : <TableCell><ClearTwoToneIcon /></TableCell> }
                    <TableCell>{this.state.date}</TableCell>
                    {/* <TableCell>
                      <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                        onClick={handleOpenDiv}
                      >
                        Add Review
                      </Button>
                    </TableCell> */}
                  </TableRow>
        );
    }
}
 
export default PastOrderInfo;