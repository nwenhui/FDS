import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h1 className="welcome"> welcome to fakegrab :)</h1>
                <div className="homeButtons">
                    <Link to="/login">
                        <Button block bssize="large">
                            log in
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button block bssize="large">
                            sign up
                        </Button>
                    </Link>
                </div>
            </div>
         );
    }
}
 
export default Home;