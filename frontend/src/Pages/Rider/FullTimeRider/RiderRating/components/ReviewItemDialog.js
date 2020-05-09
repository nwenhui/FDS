import PerfectScrollbar from "react-perfect-scrollbar";
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
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert";
import TextField from '@material-ui/core/TextField';
import { customerService } from "../../../../../services"

class ReviewItemDialog extends Component {
    state = {  
        orderid: this.props.orderid,
        items: this.props.items,
        open: this.props.open,
        review: "",
        rating: 0,
        success: false,
        error: false,
        reviewItem: this.props.items[0].itemid,
        old: 0
    }

    componentDidMount() {
        customerService.getOrderItemNames(this.state.orderid).then((response) => {
            response.json().then((data) => {
                this.setState({ items: customerService.orderItemNames(data) });
            })
        })
        customerService.getReviewCount(this.state.orderid, this.state.reviewItem).then((response) => {
            response.json().then((data) => {
                console.log('whyyyyy: ', data)
                if (data.count != 0) {
                    customerService.getReview(this.state.orderid, this.state.reviewItem).then((response) => {
                        response.json().then((data) => {
                            console.log('whyyyyy: ', data)
                            this.setState({ rating: data.rating, old: data.rating, review: data.review });
                        })
                    })
                } else {
                    this.setState({ old: null, rating: 0, review: "" });
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
                customerService.reviewItem(this.state.orderid, this.state.reviewItem, this.state.rating, this.state.review).then((response) => {
                    response.json().then((data) => {
                        window.location.reload(false);
                    })
                })
            }
        } else {
            if (this.state.rating === 0) {
                customerService.deleteReview(this.state.orderid, this.state.reviewItem).then((response) => {
                    response.json().then((data) => {
                        window.location.reload(false);
                    })
                })
            } else {
                customerService.editReview(this.state.orderid, this.state.reviewItem, this.state.rating, this.state.review).then((response) => {
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

    setReviewItem = (event) => {
        this.setState({ reviewItem: event.target.value }, () => {
        console.log('why orderid: ', this.state.orderid);
        console.log('why target vlaue: ', event.target.value);
            customerService.getReviewCount(this.state.orderid, event.target.value).then((response) => {
                response.json().then((data) => {
                    console.log('whyyyyy: ', data)
                    if (data.count != 0) {
                        customerService.getReview(this.state.orderid, this.state.reviewItem).then((response) => {
                            response.json().then((data) => {
                                console.log('whyyyyy: ', data)
                                this.setState({ rating: data.rating, old: data.rating, review: data.review });
                            })
                        })
                    } else {
                        this.setState({ old: null, rating: 0, review: "" });
                    }
                })
            })
        });
    }

    setRating = (event) => {
        this.setState({ rating: event.target.value })
    }

    setReview = (event) => {
        this.setState({ review: event.target.value })
    }

    render() { 
        return (  
            <Dialog open={this.state.open} >
                <PerfectScrollbar>
                    <DialogTitle>Review Items</DialogTitle>
                    <DialogContent>
                        <form>
                    <FormControl>
                        <InputLabel>Rating</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            value={this.state.reviewItem}
                            onChange={this.setReviewItem.bind(this)}
                            input={<Input />}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            {this.state.items.map((item) => (
                                <MenuItem value={item.itemid}>{item.itemname}</MenuItem>
                            ))}
                        </Select>
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
                        <FormControl>
                        <TextField label="Short Review" type="text" onChange={this.setReview.bind(this)} value={this.state.review} variant="outlined" />
                        </FormControl>
                    </form>
                    </DialogContent>
                    <DialogActions>
                  <Button onClick={this.handleClose.bind(this)} color="secondary">
                    Cancel
                  </Button>
                </DialogActions>
                <DialogActions>
                  <Button onClick={this.handleSubmit.bind(this)} color="secondary">
                    Save
                  </Button>
                </DialogActions>
                    {this.state.error && ErrorAlert(this.state.errorMessage)}
                </PerfectScrollbar>
              </Dialog>
        );
    }
}
 
export default ReviewItemDialog;