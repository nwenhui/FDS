import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import { orderService } from "../../../../../services"
import PromotionInfo from './PromotionInfo'

class Promotion extends Component {
    state = {  
        promotions: [],
        resid: orderService.currentRestaurantValue,
        total: orderService.currentTotalValue
    }

    componentDidMount() {
        console.log("resid???",this.state.resid);
        orderService.currentTotal.subscribe((x) =>
          this.setState({ total: x }, () => {
            console.log("total>>>>>", this.state.total);
            orderService.applicableOrders(this.state.resid, this.state.total).then((response) => {
              response.json().then((data) => {
                 this.setState({ promotions: orderService.promotionResults(data) });
             })
         })
          })
        );
        
    }

    handleChange = (event) => {
        console.log(event.target.value)
        orderService.setAppliedPromotion(event.target.value);
        console.log('payment method: ', orderService.applicableOrdersValue);
    }

    render() { 
        return (  
            <Grid item lg={6} sm={6} xl={6} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Applicable promotions:</FormLabel>
              {/* <RadioGroup
                aria-label="paymentMode"
                onChange={(e) => this.handleChange(e)}
              > */}
                {this.state.promotions.map((promotion, index) => (
                        <PromotionInfo key={index} promotionid={promotion} />
                ))} 
                {/* <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash"
                />
                <FormControlLabel
                  value="creditCard"
                  control={<Radio />}
                  label="Credit Card"
                /> */}
              {/* </RadioGroup> */}
            </FormControl>
          </Grid>
        );
    }
}
 
export default Promotion;