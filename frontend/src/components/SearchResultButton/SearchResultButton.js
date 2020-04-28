import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./style.css";

import { restaurantService } from '../../services';

class SearchResultButton extends Component {
    state = {  
        resid: this.props.resid,
        resname: "",
        min: 0,
        address: ""
    }

    fetchData() {
        restaurantService.getRestaurant(this.state.resid).then((response) => {
            response.json()
                .then((data) => {
                    console.log('found resty stuff hehe', data.resid);
                    this.setState({ resname: data.resname, min: data.minspending });
                })
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() { 
        return (
            <Card class="root">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {this.state.resname}
                    </Typography>
                    <Typography class="pos" color="textSecondary">
                        min. spending: ${this.state.min}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View Menu</Button>
                </CardActions>
            </Card>
        );
    }
}
 
export default SearchResultButton;