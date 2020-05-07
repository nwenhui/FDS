import React, { Component } from 'react';
import { restaurantService } from "../../../../services"

class PastOrderItems extends Component {
    state = {  
        itemid: this.props.itemid,
        item: null,
        qty: this.props.qty,
    }

    componentDidMount() {
        restaurantService.getFood(this.state.itemid).then((response) => {
            response.json().then((data) => {
                this.setState({ item: data.itemname })
            })
        })
    }

    render() { 
        return (  
        <li>{this.state.item}    x{this.state.qty}</li>
        );
    }
}
 
export default PastOrderItems;