import React, { Component } from 'react';
import { authenticationService } from '../../services';

class Logout extends Component {
    // state = {  }

    componentDidMount() {
        authenticationService.logout();
        this.props.history.push('/Home#');
    }

    render() { 
        return (  
            <p>loading...</p>
        );
    }
}
 
export default Logout;