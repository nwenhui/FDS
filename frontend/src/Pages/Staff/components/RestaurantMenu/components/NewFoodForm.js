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
    IconButton,
} from "@material-ui/core";
import { Button, Form, Alert } from "react-bootstrap";
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import { restaurantService } from "../../../../../services";
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../../../components/Alerts/SuccessAlert/SuccessAlert";
  

class NewItemForm extends Component {
    state = {  
        resid: this.props.resid,
        name: "",
        price: "",
        max: "",
        success: false,
        successMessage: "Item successfully added!",
        error: false,
        errorMessage:"",
    }

    fetchData() {
        restaurantService.getPromotionInformation(this.state.promotionid).then((response) => {
            response.json()
            .then((data) => {
                this.setState({ start: data.startdate, end: data.enddate, min: data.minspending, disc: data.percentageoff, freedeli: data.freedelivery }, () => {
                    console.log('promo: ', this.state.freedeli)
                });
            })
        })
    }

    componentDidMount() {
        console.log('resid???' , this.state.resid)
        // console.log('hi?????', this.state.promotionid);
        // this.fetchData();
    }

    setItemName = (event) => {
        this.setState({ name: event.target.value }, () => {console.log('start: ', this.state.name)})
    }

    setPrice = (event) => {
        this.setState({ price: event.target.value }, () => {console.log('start: ', this.state.price)})
    }

    setMaxLimit = (event) => {
        this.setState({ max: event.target.value }, () => {console.log('start: ', this.state.max)})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('clickyyyy')
        restaurantService.newFoodItem(this.state.name, this.state.price, this.state.max, this.state.resid)
            .then((data) => {
                this.setState({ error: false, success: true });
                window.location.reload(false);
            })
            .catch((error) => {
                error.text().then((errorMessage) => {
                    this.setState({ success: false, error: true, errorMessage });
                })
                // this.setState({ error: false, success: true });
                // window.location.reload(false);
            })
    }

    render() { 
        return (  
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div class="form-row">
                    <div class="col" align="center">
                        <label>Item Name</label>
                        <input type="text" class="form-control" onChange={this.setItemName.bind(this)} />
                    </div>
                    <div class="col" align="center">
                        <label>Price</label>
                        <input type="number" class="form-control" onChange={this.setPrice.bind(this)} />
                    </div>
                    <div class="col" align="center">
                        <label>Max Limit</label>
                        <input type="number" class="form-control" onChange={this.setMaxLimit.bind(this)} />
                    </div>
                    <div class="col" align="left">
                    <Button type="button" class="btn btn-dark" type="submit">
                            Add Item
                        </Button>
                    </div>
                </div>
                {this.state.error && ErrorAlert(this.state.errorMessage)}
            </form>
        );
    }
}
 
export default NewItemForm;