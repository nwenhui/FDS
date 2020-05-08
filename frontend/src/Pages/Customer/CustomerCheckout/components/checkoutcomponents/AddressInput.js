import React, { Component } from 'react';
import { Grid, TextField } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { customerService, orderService, authenticationService } from "../../../../../services"
import PromotionInfo from './PromotionInfo'

class AddressInput extends Component {
    state = {  
        id: null,
        addresses: [],
        open: false,
        addressSelected: null,
        checked: 0
    }

    componentDidMount() {
        console.log("resid???",this.state.resid);
        authenticationService.currentUser.subscribe((x) => {
            if (x !== null) {
                this.setState({ id : x.id }, () => {
                    customerService.getRecentAddress(this.state.id).then(( response ) => {
                        response.json().then((data) => {
                            this.setState({ addresses: customerService.addressResults(data) })
                        })
                    })
                })
                
            }
            
        })
        
    }

    handleChange = (event) => {
        console.log(event.target.value)
        orderService.setAppliedPromotion(event.target.value);
        console.log('payment method: ', orderService.applicableOrdersValue);
    }

    handleClose = () => {
        this.setState({ open: false})
    }

    handleOpen = () => {
        this.setState({ open: true})
    }

    handleRecentLocation = (event) => {
        this.setState({ addressSelected: event.target.value})
    }

    render() { 
        return (  
            <Grid item lg={6} sm={6} xl={6} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Enter Delivery Address:</FormLabel>
              <div>
              <Radio
                checked={this.state.checked === 0}
                //   value={this.state.promotionid.toString()}
                onChange={(e) => this.handleChange(e)}
                />
                  <TextField onChange={(e) => this.handleLocationInput(e)} />
                  </div>
                  <div>
              <Radio
                checked={this.state.checked === 1}
                //   value={this.state.promotionid.toString()}
                  onChange={(e) => this.handleChange(e)}
                />
                    Choose from recents
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    onOpen={this.handleOpen.bind(this)}
                    value={this.state.addressSelected}
                      onChange={(e) => this.handleRecentLocation(e)}
                    color="secondary"
                >
                <MenuItem value="">
                    <em>Use New Location</em>
                </MenuItem>
                {this.state.addresses.map((address, index) => (
                <MenuItem value={index}>{address}</MenuItem>
                ))}
                </Select>
                  </div>
            </FormControl>
          </Grid>
        );
    }
}
 
export default AddressInput;