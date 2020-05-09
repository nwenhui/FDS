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
import { staffService, authenticationService, managerService } from "../../../../services";
import ErrorAlert from "../../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../../components/Alerts/SuccessAlert/SuccessAlert";

const now = new Date();
const tomorrow = new Date(now)
tomorrow.setDate(tomorrow.getDate() + 1)

if (tomorrow.getMonth() == 11) {
    var current = new Date(now.getFullYear() + 1, 0, 1);
} else {
    var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
}

var dd = String(current.getDate()).padStart(2, '0');
var mm = String(current.getMonth() + 1).padStart(2, '0');
var yyyy = current.getFullYear();

const today = yyyy + '-' + mm + '-' + dd;
  

class NewSalaryForm extends Component {
    state = {  
        resid: this.props.resid,
        start: null,
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
        console.log('wtf?',event.target.value)
        this.setState({ start: event.target.value}, () => {
            managerService.checkriderid(this.state.start).then((response) => {
                response.json().then((data) => {

                })
                .catch((error) => {
                    error.text().then((errorMessage) => {
                        this.setState({ error: true, errorMessage })
                        this.setState({ start: null })
                    })
                })
            })
        })
        managerService.checkriderid(event.target.value).then((response) => {
            response.json().then((data) => {
                this.setState({ start: data.id })
            })
            .catch((error) => {
                error.text().then((errorMessage) => {
                    this.setState({ error: true, errorMessage })
                })
            })
        })
        // this.setState({ start: event.target.value }, () => {console.log('start: ', this.state.start)})
    }

    setEndDate = (event) => {
        if (event.target.value < today) {
            const errorMessage = "You can onky change a salary starting from the next month "
            this.setState({ error: true, errorMessage })
        } else {
        
        this.setState({ end: event.target.value, error: false }, () => {
            console.log('click')
        })
    }
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
        
        managerService.newsalary(this.state.end, this.state.min, this.state.start)
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
                        <label>Rider id</label>
                        <input type="number" class="form-control" value={this.state.start} onChange={this.setStartDate.bind(this)} />
                    </div>
                    <div class="col" align="center">
                        <label>Start Date</label>
                        <input type="date" class="form-control" value={this.state.end} onChange={this.setEndDate.bind(this)} />
                    </div>
                    <div class="col" align="center">
                        <label>Base Salary $</label>
                        <input type="number" class="form-control" onChange={this.setMinSpending.bind(this)} />
                    </div>
                    <div class="col" align="left">
                    <Button type="button" class="btn btn-dark" type="submit">
                            Set Promotion
                        </Button>
                    </div>
                </div>
                {this.state.error && ErrorAlert(this.state.errorMessage)}
            </form>
        );
    }
}
 
export default NewSalaryForm;