import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import NavBar from '../../components/Navigation/Navigation';


class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <NavBar history={this.props.history}/>
                <p>u issa manager</p>
            </div>
         );
    }
}
 
export default Home;