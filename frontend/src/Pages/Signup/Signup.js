import React, { Component } from 'react';
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./Signup.css";

const option = [
    { value: 1, label: 'FDS Manager' },
    { value: 2, label: 'Staff' },
    { value: 3, label: 'Rider' },
    { value: 4, label: 'Customer' }
];

const dropdown = option.map((option) =>
    <option key={option.value.toString()} value={option.value}>{option.label}</option>
);

function handleErrors(response) {
    if (!response.ok) {
        throw response;
    }
    return response;
}

function getURL(type) {
    switch(Number(type)) {
        case option[0].value:
            return 'http://localhost:3000/api/v1/manager/auth/signup';
            break;
        case option[1].value:
            return 'http://localhost:3000/api/v1/staff/auth/signup';
            break;    
        case option[2].value:
            return 'http://localhost:3000/api/v1/rider/auth/signup';
            break;
        case option[3].value:
            return 'http://localhost:3000/api/v1/customer/auth/signup';
            break;  
    }
}

class Signup extends Component {
    state = { 
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        type: "1",
        errorMessage: ""
    }

    setFirstName = (event) => {
        var value = event.target.value;
        this.setState({ firstname: value}, () => {console.log(this.state.firstname)});
    }

    setLastName = (event) => {
        var value = event.target.value;
        this.setState({ lastname: value}, () => {console.log(this.state.lastname)});
    }

    setEmail = (event) => {
        var value = event.target.value;
        this.setState({ email: value}, () => {console.log(this.state.email)});
    }
  
    setPassword = (event) => {
      var value = event.target.value;
      this.setState({ password: value}, () => {console.log(this.state.password)});
    }
  
    setType = (event) => {
      var value = event.target.value;
      this.setState({ type: value}, () => {console.log(this.state.type)});
    } 

    handleSubmit(event) {
        event.preventDefault();
        const data = {first_name: this.state.firstname, last_name: this.state.lastname, email: this.state.email, password: this.state.password};
        const url = getURL(this.state.type);
    
        var request = new Request(url, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });

        fetch(request)
            .then(handleErrors)
            .then((response) => {
                this.setState({ error: "" });
                response.json()
                    .then((data) => {
                        console.log("sign in donezo!!! :D");
                        var type = Number(this.state.type);
                        if (type === option[0].value) {
                            this.props.history.push('/manager/home');
                        } else if (type === option[1].value) {
                            this.props.history.push('/staff/home');
                        } else if (type === option[2].value) {
                            this.props.history.push('/rider/home');
                        } else if (type === option[3].value) {
                            this.props.history.push('/customer/home');
                        }
                    })
            })
            .catch((error) => {
                error.text().then( errorMessage => {
                    this.setState({ error: errorMessage}, () => {console.log('Error: ', this.state.error)});
                })
            })
    }

    render() { 
        return ( 
            <div className="signup">
                <div className="welcome">
                    <h1>hi new user :)</h1>
                </div>
            <div className="signupForm">
                <Form onSubmit= {(e) => this.handleSubmit(e)}>  
                    <Form.Group controlId="firstname" bssize="large">
                        <Form.Label>first name</Form.Label>
                        <Form.Control 
                            autoFocus
                            type="username"
                            placeholder="first name"
                            onChange={this.setFirstName.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group controlId="lastname" bssize="large">
                        <Form.Label>last name</Form.Label>
                        <Form.Control 
                            autoFocus
                            type="username"
                            placeholder="last name"
                            onChange={this.setLastName.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group controlId="email" bssize="large">
                        <Form.Label>email</Form.Label>
                        <Form.Control 
                            autoFocus
                            type="email"
                            placeholder="enter your email"
                            onChange={this.setEmail.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" bssize="large">
                        <Form.Label>password</Form.Label>
                        <Form.Control 
                            autoFocus
                            type="password"
                            placeholder="password"
                            onChange={this.setPassword.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group controlId="selectType">
                        <Form.Label>type</Form.Label>
                        <Form.Control as="select" custom onChange={this.setType.bind(this)}>
                            {dropdown}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="outline-primary" block bssize="large" type="submit">
                        sign up
                    </Button>
                </Form>
                <Link to="/Home">
                    <Button block bssize="large">
                        back
                    </Button>
                </Link>
                { this.state.error && 
                    <div class="alert alert-danger alert-dismissable fade show" role="alert">
                        <strong>ohno! </strong>
                        {this.state.error}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
            </div>
            </div>
         );
    }
}
 
export default Signup;