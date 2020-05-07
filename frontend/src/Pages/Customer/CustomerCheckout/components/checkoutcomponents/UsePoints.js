import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { orderService } from '../../../../../services'
import Switch from '@material-ui/core/Switch';

class UsePoints extends Component {
    state = {  
      delivery: orderService.deliveryFeeValue,
      checked: false
    }

    handleChange = (event) => {
      console.log('value???: ',event.target.checked)
      const fee = event.target.checked ? 0 : 4;
      orderService.setDeliveryFee(fee);
      orderService.setUsedPoints(event.target.checked)
      console.log('promotion: ', orderService.deliveryFeeValue);
      this.setState({ checked: event.target.checked })
  }

    render() { 
        return (  
            <Grid item lg={6} sm={6} xl={6} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Use 10 points for free delivery?</FormLabel>
              <Switch
                checked={this.state.checked}
                onChange={(e) => this.handleChange(e)}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            </FormControl>
          </Grid>
        );
    }
}
 
export default UsePoints;