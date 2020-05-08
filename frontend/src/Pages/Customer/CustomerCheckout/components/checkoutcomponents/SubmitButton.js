import React, { Component } from 'react';
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { orderService, restaurantService } from "../../../../../services"
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert"


class SubmitButton extends Component {
    state = {  
        // resid: orderService.currentRestaurantValue,
        min: 0,
        error: false,
        errorMessage: ""
    }

    componentDidMount() {
        if (orderService.currentRestaurantValue) {
        restaurantService.getMin(orderService.currentRestaurantValue).then((response) => {
            response.json().then((data) => {
                this.setState({ min: data.minspending })
            })
        })
        }
    }

    handleSubmit = (event) => {
        if (orderService.currentTotalValue < this.state.min) {
            const errorMessage = "You have not reached the minimum order of $" + this.state.min + " excluding delivery fees. Add more items before submitting!";
            this.setState({ error: true, errorMessage})
        } else if (!orderService.currentRestaurantValue) {
            const errorMessage = "Your cart is empty... Search for some items to add!";
            this.setState({ error: true, errorMessage})
        }
    }


    render() { 
        return (  
            <div>
            <IconButton
            style={{ marginLeft: "200px" }}
            fullWidth={true}
            color="secondary"
            variant="outlined"
            onClick={this.handleSubmit.bind(this)}
            aria-label="Confirm Order"
          >
            Submit Order &nbsp;
            <AddShoppingCartIcon />
          </IconButton>
          {this.state.error && ErrorAlert(this.state.errorMessage)}
          </div>
        );
    }
}
 
export default SubmitButton;