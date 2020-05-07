import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import { authenticationService, orderService } from "../../../../../services"

class PaymentMethod extends Component {
    state = {  
        user: null,
        creditcard: false,
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe((x) =>
            this.setState({
                user: x,
            },() => {
                console.log(x.ccid)
                if (x.ccid === null) {
                    this.setState({ creditcard: false });
                } else {
                    this.setState({ creditcard: true });
                }
            })
        );
    }

    handleChange = (event) => {
        orderService.setOrderPayment(event.target.value);
        console.log('payment method: ', orderService.orderPaymentValue);
    }

    render() { 
        return (  
            <Grid item lg={6} sm={6} xl={6} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Pay by:</FormLabel>
              <RadioGroup
                aria-label="paymentMode"
                onChange={(e) => this.handleChange(e)}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash on delivery"
                />
                {this.state.creditcard &&
                <FormControlLabel
                  value="creditcard"
                  control={<Radio />}
                  label="Credit Card"
                />
                }
              </RadioGroup>
            </FormControl>
          </Grid>
        );
    }
}
 
export default PaymentMethod;