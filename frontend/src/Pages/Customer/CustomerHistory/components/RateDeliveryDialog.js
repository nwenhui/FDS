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
import ErrorAlert from "../../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../../components/Alerts/SuccessAlert/SuccessAlert";
import TextField from '@material-ui/core/TextField';
import { customerService } from "../../../../services"

class RateDeliveryDialog extends Component {
    state = {  
        orderid: this.props.orderid,
        open: this.props.open,
        old: null,
        rating: 0,
        success: false,
        error: false,
    }

    componentDidMount() {
        customerService.getRatingCount(this.state.orderid).then((response) => {
            response.json().then((data) => {
                console.log('whyyyyy: ', data)
                if (data.count != 0) {
                    customerService.getRating(this.state.orderid).then((response) => {
                        response.json().then((data) => {
                            console.log('whyyyyy: ', data)
                            this.setState({ rating: data.rating, old: data.rating });
                        })
                    })
                }
            })
        })
    }

    setRating = (event) => {
        this.setState({ rating: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('clickyyyy')
        if (this.state.old === null) {
            if (this.state.rating != 0) {
                customerService.rateDelivery(this.state.orderid, this.state.rating).then((response) => {
                    response.json().then((data) => {
                        window.location.reload(false);
                    })
                })
            }
        } else {
            if (this.state.rating === 0) {
                customerService.deleteRating(this.state.orderid).then((response) => {
                    response.json().then((data) => {
                        window.location.reload(false);
                    })
                })
            } else {
                customerService.editRating(this.state.orderid, this.state.rating).then((response) => {
                    response.json().then((data) => {
                        window.location.reload(false);
                    })
                })
            }
        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() { 
        return (  
            <Dialog open={this.state.open} >
                <DialogTitle>Rate Delivery</DialogTitle>
                <DialogContent>
                  <form>
                    <FormControl>
                      {/* <TextField disabled label="Start Date" type="date" onChange={this.setStartDate.bind(this)} value={this.state.start} variant="outlined" /> */}
                    </FormControl>
                    <FormControl>
                      <InputLabel>Rating</InputLabel>
                      <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        value={this.state.rating}
                        onChange={this.setRating.bind(this)}
                        input={<Input />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>Delete</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose.bind(this)} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSubmit.bind(this)} color="secondary">
                    Save
                  </Button>
                </DialogActions>
                {this.state.error && ErrorAlert(this.state.errorMessage)}
              </Dialog>
        );
    }
}
 
export default RateDeliveryDialog;