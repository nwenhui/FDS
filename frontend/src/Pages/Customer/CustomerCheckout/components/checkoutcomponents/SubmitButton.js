import React, { Component } from 'react';
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { orderService, restaurantService, authenticationService } from "../../../../../services"
import ErrorAlert from "../../../../../components/Alerts/ErrorAlert/ErrorAlert"
import SuccessAler from "../../../../../components/Alerts/SuccessAlert/SuccessAlert"


class SubmitButton extends Component {
    state = {  
        // resid: orderService.currentRestaurantValue,
        min: 0,
        error: false,
        success: false,
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
        } else if (!orderService.orderPaymentValue) {
            const errorMessage = "You have not selected an order payment method"
            this.setState({ error: true, errorMessage})
        } else if (!orderService.locationSubjectValue) {
            const errorMessage = "You have not entered your delivery location"
            this.setState({ error: true, errorMessage})
        }
        else {
            console.log('subtotal: ', orderService.currentTotalValue)
            console.log('promo: ', orderService.promotionAppliedValue)
            console.log('usedpoints: ', orderService.usedPointsValue)
            console.log('payment', orderService.orderPaymentValue)
            console.log('address', orderService.locationSubjectValue)
            console.log('deli fee', orderService.deliveryFeeValue)
            console.log('cart: ', orderService.currentCheckOutValue)
            const id = authenticationService.currentUserValue.id
            var cc;
            if (orderService.orderPaymentValue == 'cash') {
                cc = false
            } else {
                cc = true
            }
            const address = orderService.locationSubjectValue
            const delivery = orderService.deliveryFeeValue
            const usedpoints = orderService.usedPointsValue ? 10 : 0;
            const subtotal = orderService.currentTotalValue
            const promo = orderService.promotionAppliedValue
            const cart = orderService.currentCheckOutValue
            const current = authenticationService.currentUserValue.points
            orderService.newOrder(id, cc, address, delivery, usedpoints, subtotal, promo, cart, current).then((response) => {
                response.json().then((data) => {
                    orderService.clearOrderMem();
                    this.setState({error: false, success: true});
                })
            })
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
          {this.state.success && SuccessAler("Order successfully submitted! Thank you :)")}
          </div>
        );
    }
}
 
export default SubmitButton;