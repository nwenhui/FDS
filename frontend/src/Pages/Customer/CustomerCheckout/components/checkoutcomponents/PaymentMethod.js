import React, { Component } from 'react';
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import { authenticationService } from "../../../../../services"

class PaymentMethod extends Component {
    state = {  
        user: null,
        creditcard: false,
        cashpayment: false,
        ccpayment: false,
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
        if (event.target.vaue === "cash") {
            this.setState({ cashpayment: true, ccpayment: false });
        } else {
            this.setState({ cashpayment: false, ccpayment: true });
        }

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