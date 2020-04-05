import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <Link to="/Home">
                <Button block bssize="large">
                    log out
                </Button>
            </Link>
         );
    }
}
 
export default Home;