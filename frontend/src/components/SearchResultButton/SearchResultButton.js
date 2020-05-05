import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import "./style.css";

import { restaurantService } from '../../services';
import history from '../../history';

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

    handleClick(event) {
        console.log('clicky');
        event.preventDefault();
        const to = '/restaurant/menu?id=' + this.state.resid;
        this.props.history.push(to);
    }

    render() { 
        return (
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{this.state.resname}</h5>
                    <p class="card-text">min. spending: ${this.state.min}</p>
                    <form>
                        <Button onClick={(e) => this.handleClick(e)}>View Menu</Button>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default SearchResultButton;