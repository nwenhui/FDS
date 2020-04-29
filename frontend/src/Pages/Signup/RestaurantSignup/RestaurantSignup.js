import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./RestaurantSignup.scss";

import NavBar from "../../../components/Navigation/Navigation";
import { authenticationService } from "../../../services";
import ErrorAlert from "../../../components/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../../components/Alerts/SuccessAlert/SuccessAlert";

class RestaurantSignup extends Component {
  state = {
    restaurantName: "",
    minSpending: "",
    address: "",
    errorMessage: "",
    error: false,
    success: false,
  };

  setRestaurantName = (event) => {
    var value = event.target.value;
    this.setState({ restaurantName: value }, () => {
      console.log(this.state.restaurantName);
    });
  };

  setMinSpending = (event) => {
    var value = event.target.value;
    this.setState({ minSpending: value }, () => {
      console.log(this.state.minSpending);
    });
  };

  setAddress = (event) => {
    var value = event.target.value;
    this.setState({ address: value }, () => {
      console.log(this.state.address);
    });
  };

  // setPassword = (event) => {
  //   var value = event.target.value;
  //   this.setState({ password: value}, () => {console.log(this.state.password)});
  // }

  // setType = (event) => {
  //   var value = event.target.value;
  //   this.setState({ type: value}, () => {console.log(this.state.type)});
  // }

  handleSubmit(event) {
    event.preventDefault();
    authenticationService
      .restaurantSignup(
        this.state.restaurantName,
        this.state.minSpending,
        this.state.address
      )
      .then((data) => {
        this.setState({ error: false, success: true }, () =>
          console.log(this.state.error)
        );
      })
      .catch((error) => {
        console.log(error);
        error.text().then((errorMessage) => {
          this.setState({ error: true, errorMessage }, () => {
            console.log("error: ", this.state.errorMessage);
            console.log("status: ", this.state.error);
          });
        });
      });
  }

  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <div className="signup">
          <div className="welcome">
            <h1>hi new restaurant :)</h1>
          </div>
          <div className="signupForm">
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Group controlId="resname" bssize="large">
                <Form.Label>name</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder="name of restaurant"
                  onChange={this.setRestaurantName.bind(this)}
                />
              </Form.Group>
              <Form.Group controlId="minspending" bssize="large">
                <Form.Label>min. spending</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder="whole numbers only"
                  onChange={this.setMinSpending.bind(this)}
                />
              </Form.Group>
              <Button
                variant="outline-primary"
                block
                bssize="large"
                type="submit"
              >
                sign up
              </Button>
            </Form>
            <Link to="/Home">
              <div className="backbutton">
                <Button block bssize="large">
                  back
                </Button>
              </div>
            </Link>
            {this.state.success && SuccessAlert("signup donezo")}
            {this.state.error && ErrorAlert(this.state.errorMessage)}
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantSignup;
