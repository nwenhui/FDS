import React, { Component } from 'react';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button, Form, Alert } from "react-bootstrap";
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import { staffService } from "../../../../../services";
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../../../components/Alerts/SuccessAlert/SuccessAlert";
import TextField from '@material-ui/core/TextField';

const now = new Date();
const tomorrow = new Date(now)
tomorrow.setDate(tomorrow.getDate() + 1)
var dd = String(tomorrow.getDate()).padStart(2, '0');
var mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
var yyyy = tomorrow.getFullYear();

const today = yyyy + '-' + mm + '-' + dd;
  

class EditPromotionDialog extends Component {
    state = {  
        promotionid: this.props.promotionid,
        start: today,
        end: today,
        min: 0,
        disc: 0,
        freedeli: false,
        success: false,
        successMessage: "Promotion successfully created!",
        error: false,
        errorMessage:"",
        edit: this.props.edit
    }

    fetchData() {
        staffService.getPromotionInformation(this.state.promotionid).then((response) => {
            response.json()
            .then((data) => {
                console.log("wtffff????" ,data)
                this.setState({ start: data.startdate.substring(0,10), end: data.enddate.substring(0,10), min: data.minspending, disc: data.percentageoff, freedeli: data.freedelivery },() => {
                    
                    console.log("today????" ,today)
                });
            })
        })
    }

    componentDidMount() {
        this.fetchData();
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

    setAvailability = (event) => {
        this.setState({ available: event.target.checked }, () => {console.log('evailable: ', this.state.available)})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('clickyyyy')
        staffService.editPromotion(this.state.start, this.state.end, this.state.min, this.state.disc, this.state.freedeli, this.state.promotionid)
            .then((data) => {
                this.setState({ error: false, success: true });
                this.setState({ edit: false });
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

    handleClose = () => {
        this.setState({edit: false})
    }

    render() { 
        return (  
            <Dialog open={this.state.edit} >
                <DialogTitle>Edit Promotion</DialogTitle>
                <DialogContent>
                  <form>
                    <FormControl>
                      <TextField disabled label="Start Date" type="date" onChange={this.setStartDate.bind(this)} value={this.state.start} variant="outlined" />
                    </FormControl>
                    <FormControl>
                      <TextField label="End Date" type="date" onChange={this.setEndDate.bind(this)} value={this.state.end} variant="outlined" />
                    </FormControl>
                    <FormControl>
                      <TextField label="Min. Spending" type="number" onChange={this.setMinSpending.bind(this)} value={this.state.min} variant="outlined" />
                    </FormControl>
                    <FormControl>
                      <TextField label="Discount %" type="number" onChange={this.setDiscount.bind(this)} value={this.state.disc} variant="outlined" />
                    </FormControl>
                    <FormControl>
                        <label>Free Delivery</label>
                        <input type="checkbox" label="Availability" onClick={this.setFreeDelivery} checked={this.state.freedeli} />
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose.bind(this)} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSubmit.bind(this)} color="secondary">
                    Save Promotion
                  </Button>
                </DialogActions>
                {this.state.error && ErrorAlert(this.state.errorMessage)}
              </Dialog>
        );
    }
}
 
export default EditPromotionDialog;