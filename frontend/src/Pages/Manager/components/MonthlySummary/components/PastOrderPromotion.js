import React, { Component } from 'react';
import {
    TableCell,
} from "@material-ui/core";
import { restaurantService } from "../../../../../services"

class PastOrderPromotion extends Component {
    state = {  
        promotionid: this.props.promotionid,
        label: ""
    }

    componentDidMount() {
        restaurantService.getPromotionInformation(this.state.promotionid).then((response) => {
            response.json().then((data) => {
                let label = ""
                if (data.freedelivery) {
                    label = data.percentageoff + "% off total with free delivery"
                } else {
                    label = data.percentageoff + "% off total"
                }
                this.setState({ label });
            })
        })
    }

    render() { 
        return (  
            <TableCell>{this.state.label}</TableCell>
        );
    }
}
 
export default PastOrderPromotion;