import React, { Component } from 'react';
import { orderService } from "../../../services"
import LocationInput from './components/LocationInput'
import RecentLocations from './components/RecentLocations'
import { Grid, Typography } from "@material-ui/core";


class AddressInput extends Component {
    state = {  
        location: ""
    }

    componentDidMount() {
        orderService.locationSubject.subscribe((x) => {
            if (x !== null) {
                this.setState({ location: x })
            }
        })
    }

    handleLocationInput(event) {
        orderService.setLocation(event.target.value);
        this.setState({ locaiton: event.target.value })
        console.log('location??', orderService.locationSubjectValue)
    }

    render() { 
        return (  
            <Grid container direction="row" justify="center" alignItems="center">
            <LocationInput
              value={this.state.location}
              placeholder="Enter Delivery Address"
              onChange={this.handleLocationInput.bind(this)}
            />
            
            <Grid container justify="center">
              <Typography color="black" gutterBottom variant="h6">
                OR
              </Typography>
            </Grid>

            <RecentLocations location={this.state.location}/>
          </Grid>
        );
    }
}
 
export default AddressInput;