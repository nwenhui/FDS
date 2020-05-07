import React, { Component } from 'react';
import {
    TableCell,
    TableRow,
    IconButton
} from "@material-ui/core";
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { customerService } from "../../../../services"
import PastOrderPromotion from "./PastOrderPromotion";
import PastOrderItems from "./PastOrderItems"
import RateDeliveryDialog from "./RateDeliveryDialog"

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
        rate: false,
        review: false,
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

    handleRate = (event) => {
        if (this.state.rate) {
            this.setState({ rate: false });
        } else {
            this.setState({ rate: true });
        }
    }

    handleReview = (event) => {
        if (this.state.review) {
            this.setState({ review: false });
        } else {
            this.setState({ review: true });
        }
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
                    <TableCell>
                        <IconButton
                            size="small"
                            onClick={this.handleRate.bind(this)}
                        >
                            <EditIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <IconButton
                            size="small"
                            onClick={() => this.handleReview.bind(this)}
                        >
                            <EditIcon />
                        </IconButton>
                    </TableCell>
                    {this.state.rate && <RateDeliveryDialog open={this.state.rate} orderid={this.state.orderid} />}
                  </TableRow>
        );
    }
}
 
export default PastOrderInfo;