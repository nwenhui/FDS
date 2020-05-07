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
import { staffService, authenticationService } from "../../../../../services";
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../../../components/Alerts/SuccessAlert/SuccessAlert";

const now = new Date();
const tomorrow = new Date(now)
tomorrow.setDate(tomorrow.getDate() + 1)
var dd = String(tomorrow.getDate()).padStart(2, '0');
var mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
var yyyy = tomorrow.getFullYear();

const today = yyyy + '-' + mm + '-' + dd;
  

class NewPromotionForm extends Component {
    state = {  
        resid: this.props.resid,
        start: today,
        end: today,
        min: 0,
        disc: 0,
        freedeli: false,
        success: false,
        successMessage: "Promotion successfully created!",
        error: false,
        errorMessage:"",
    }

    fetchData() {
        staffService.getPromotionInformation(this.state.promotionid).then((response) => {
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

    setStartDate = (event) => {
        this.setState({ start: event.target.value }, () => {console.log('start: ', this.state.start)})
    }

    setEndDate = (event) => {
        this.setState({ end: event.target.value }, () => {console.log('start: ', this.state.end)})
    }

    setMinSpending = (event) => {
        this.setState({ min: event.target.value }, () => {console.log('start: ', this.state.min)})
    }

    setDiscount = (event) => {
        this.setState({ disc: event.target.value }, () => {console.log('start: ', this.state.disc)})
    }

    setFreeDelivery = (event) => {
        this.setState({ freedeli: event.target.checked }, () => {console.log('start: ', this.state.freedeli)})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('clickyyyy')
        staffService.newPromotion(this.state.start, this.state.end, this.state.min, this.state.disc, this.state.freedeli, authenticationService.currentUserValue.id)
            .then((data) => {
                console.log('hello?????')
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
                        <label>Start Date</label>
                        <input type="date" class="form-control" defaultValue={this.state.start} onChange={this.setStartDate.bind(this)} />
                    </div>
                    <div class="col" align="center">
                        <label>End Date</label>
                        <input type="date" class="form-control" defaultValue={this.state.end} onChange={this.setEndDate.bind(this)} />
                    </div>
                    <div class="col" align="center">
                        <label>Min. Spending $</label>
                        <input type="number" class="form-control" onChange={this.setMinSpending.bind(this)} />
                    </div>
                    <div class="col" align="center">
                        <label>Discount %</label>
                        <input type="number" class="form-control" onChange={this.setDiscount.bind(this)} />
                    </div>
                    <div class="col" align="left">
                        <label>Free Delivery</label>
                        <input align="center" type="checkbox" class="form-control" onChange={this.setFreeDelivery.bind(this)} />
                    </div>
                    <div class="col" align="left">
                    <Button type="button" class="btn btn-dark" type="submit">
                            Add Promotion
                        </Button>
                    </div>
                </div>
                {this.state.error && ErrorAlert(this.state.errorMessage)}
            </form>
        );
    }
}
 
export default NewPromotionForm;