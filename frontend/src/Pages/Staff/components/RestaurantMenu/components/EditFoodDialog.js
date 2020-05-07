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
import { restaurantService } from "../../../../../services";
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../../../components/Alerts/SuccessAlert/SuccessAlert";
import TextField from '@material-ui/core/TextField';
  

class EditFoodDialog extends Component {
    state = {  
        itemid: this.props.itemid,
        name: "",
        price: 0,
        amt_avail: 0,
        limit: 0,
        available: true,
        categories: [],
        edit: false,
        success: false,
        successMessage: "Item successfully added!",
        error: false,
        errorMessage:"",
        edit: this.props.edit,
    }

    fetchData() {
        restaurantService.getFood(this.state.itemid).then((response) => {
            response.json()
            .then((data) => {
                this.setState({ price: data.cost, limit: data.maxlimit, name: data.itemname });
            })
        })
        restaurantService.getFoodAvailability(this.state.itemid).then((response) => {
            response.json()
                .then((data) => {
                    console.log(' stuff hehe', data);
                    this.setState({ amt_avail: data.amt_available, available: data.available });
                })
        })
        restaurantService.getFoodCategory(this.state.itemid).then((response) => {
            response.json()
            .then((data) => {
                console.log(data);
                this.setState({ categories: restaurantService.foodCategoryResults(data) }, ( ) => {console.log(this.state.categoris)});
            })
        })        
    }

    componentDidMount() {
        this.fetchData();
    }

    setItemName = (event) => {
        this.setState({ name: event.target.value }, () => {console.log('start: ', this.state.name)})
    }

    setPrice = (event) => {
        this.setState({ price: event.target.value }, () => {console.log('start: ', this.state.price)})
    }

    setMaxLimit = (event) => {
        this.setState({ max: event.target.value }, () => {console.log('start: ', this.state.limit)})
    }
    
    setCategories = (event) => {

    }

    setAvailability = (event) => {
        this.setState({ available: event.target.checked }, () => {console.log('evailable: ', this.state.available)})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('clickyyyy')
        restaurantService.editFood(this.state.name, this.state.price, this.state.limit, this.state.itemid, this.state.available)
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
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                  <form>
                    <FormControl>
                      <TextField label="Item Name" onChange={this.setItemName.bind(this)} value={this.state.name} variant="outlined" />
                    </FormControl>
                    <FormControl>
                      <TextField label="Price" type="number" onChange={this.setPrice.bind(this)} value={this.state.price} variant="outlined" />
                    </FormControl>
                    <FormControl>
                      <TextField disabled label="Amt in Inventory" type="number" value={this.state.amt_avail} variant="outlined" />
                    </FormControl>
                    <FormControl>
                      <TextField label="Item Limit" type="number" onChange={this.setMaxLimit.bind(this)} value={this.state.limit} variant="outlined" />
                    </FormControl>
                    <FormControl>
                      <InputLabel>Categories</InputLabel>
                      <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        // value={age}
                        onChange={this.setCategories.bind(this)}
                        input={<Input />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl>
                        <label>Availability</label>
                        <input type="checkbox" label="Availability" onClick={this.setAvailability} checked={this.state.available} />
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose.bind(this)} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSubmit.bind(this)} color="secondary">
                    Save Item
                  </Button>
                </DialogActions>
              </Dialog>
        );
    }
}
 
export default EditFoodDialog;