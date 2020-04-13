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
                <Link to="/Home">
                    <Button block bssize="large">
                        log out
                    </Button>
                </Link>
            </div>
         );
    }
}
 
export default Home;