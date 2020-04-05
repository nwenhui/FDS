import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <Link to="/">
                <Button block bssize="large">
                    log out
                </Button>
            </Link>
         );
    }
}
 
export default Home;