import React, { Component } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.scss";

import NavBar from "../../components/Navigation/Navigation";
import { authenticationService } from "../../services";
import ErrorAlert from "../../components/Alerts/ErrorAlert/ErrorAlert";

const option = [
  { value: 1, label: "FDS Manager" },
  { value: 2, label: "Staff" },
  { value: 3, label: "Rider" },
  { value: 4, label: "Customer" },
];

const dropdown = option.map((option) => (
  <option key={option.value.toString()} value={option.value}>
    {option.label}
  </option>
));

const rideroption = [
  { value: 1, label: "Full time rider" },
  { value: 2, label: "Part time rider" },
];

const riderdropdown = rideroption.map((option) => (
  <option key={option.value.toString()} value={option.value}>
    {option.label}
  </option>
));

function handleErrors(response) {
  if (!response.ok) {
    throw response;
  }
  return response;
}

function getURL(type) {
  switch (Number(type)) {
    case option[0].value:
      return "http://localhost:3000/api/v1/manager/auth/signup";
      break;
    case option[1].value:
      return "http://localhost:3000/api/v1/staff/auth/signup";
      break;
    case option[2].value:
      return "http://localhost:3000/api/v1/rider/auth/signup";
      break;
    case option[3].value:
      return "http://localhost:3000/api/v1/customer/auth/signup";
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
    errorMessage: "",
    error: false,
    resid: "",
    rider: "1",
  };

  componentDidMount() {
    if (authenticationService.currentUserValue) {
      this.props.history.push("/dashboard");
    }
  }

  setFirstName = (event) => {
    var value = event.target.value;
    this.setState({ firstname: value }, () => {
      console.log(this.state.firstname);
    });
  };

  setLastName = (event) => {
    var value = event.target.value;
    this.setState({ lastname: value }, () => {
      console.log(this.state.lastname);
    });
  };

  setEmail = (event) => {
    var value = event.target.value;
    this.setState({ email: value }, () => {
      console.log(this.state.email);
    });
  };

  setPassword = (event) => {
    var value = event.target.value;
    this.setState({ password: value }, () => {
      console.log(this.state.password);
    });
  };

  setType = (event) => {
    var value = event.target.value;
    this.setState({ type: value }, () => {
      console.log(this.state.type);
    });
  };

  setResid = (event) => {
    var value = event.target.value;
    this.setState({ resid: value }, () => {
      console.log(this.state.resid);
    });
  };

  setRider = (event) => {
    var value = event.target.value;
    this.setState({ rider: value }, () => {
      console.log(this.state.rider);
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (Number(this.state.type) === option[1].value) {
      authenticationService
        .staffSignup(
          this.state.firstname,
          this.state.lastname,
          this.state.email,
          this.state.password,
          this.state.resid
        )
        .then((data) => {
          const to = "/dashboard";
          this.setState({ error: false }, () => console.log(this.state.error));
          this.props.history.push(to);
        })
        .catch((error) => {
          error.text().then((errorMessage) => {
            this.setState({ error: true, errorMessage }, () => {
              console.log("error: ", this.state.errorMessage);
              console.log("status: ", this.state.error);
            });
          });
        });
    } else if (Number(this.state.type) === option[2].value) {
      authenticationService
        .riderSignup(
          this.state.firstname,
          this.state.lastname,
          this.state.email,
          this.state.password,
          Number(this.state.rider)
        )
        .then((data) => {
          const to = "/dashboard";
          this.setState({ error: false }, () => console.log(this.state.error));
          this.props.history.push(to);
        })
        .catch((error) => {
          error.text().then((errorMessage) => {
            this.setState({ error: true, errorMessage }, () => {
              console.log("error: ", this.state.errorMessage);
              console.log("status: ", this.state.error);
            });
          });
        });
    } else {
      authenticationService
        .signup(
          this.state.firstname,
          this.state.lastname,
          this.state.email,
          this.state.password,
          Number(this.state.type)
        )
        .then((data) => {
          const to = "/dashboard";
          this.setState({ error: false }, () => console.log(this.state.error));
          this.props.history.push(to);
        })
        .catch((error) => {
          error.text().then((errorMessage) => {
            this.setState({ error: true, errorMessage }, () => {
              console.log("error: ", this.state.errorMessage);
              console.log("status: ", this.state.error);
            });
          });
        });
    }
  }

  // handleSubmit(event) {
  //     event.preventDefault();
  //     const data = {first_name: this.state.firstname, last_name: this.state.lastname, email: this.state.email, password: this.state.password};
  //     const url = getURL(this.state.type);

  //     var request = new Request(url, {
  //         method: 'POST',
  //         headers: new Headers({ 'Content-Type': 'application/json' }),
  //         body: JSON.stringify(data)
  //     });

  //     fetch(request)
  //         .then(handleErrors)
  //         .then((response) => {
  //             this.setState({ error: "" });
  //             response.json()
  //                 .then((data) => {
  //                     console.log("sign in donezo!!! :D");
  //                     var type = Number(this.state.type);
  //                     if (type === option[0].value) {
  //                         this.props.history.push('/manager/home');
  //                     } else if (type === option[1].value) {
  //                         this.props.history.push('/staff/home');
  //                     } else if (type === option[2].value) {
  //                         this.props.history.push('/rider/home');
  //                     } else if (type === option[3].value) {
  //                         this.props.history.push('/customer/home');
  //                     }
  //                 })
  //         })
  //         .catch((error) => {
  //             error.text().then( errorMessage => {
  //                 this.setState({ error: errorMessage}, () => {console.log('Error: ', this.state.error)});
  //             })
  //         })
  // }

  render() {
    return (
      <div>
        <NavBar history={this.props.history} />

        <div className="signup">
          <div className="welcome">
            <h1>hi new user :)</h1>
          </div>
          <div className="signupForm">
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Group controlId="selectType">
                <Form.Label>type</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={this.setType.bind(this)}
                >
                  {dropdown}
                </Form.Control>
              </Form.Group>
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
              {Number(this.state.type) === option[1].value && (
                <Form.Group controlId="resid" bssize="large">
                  <Form.Label>restaurant id</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="restaurant id"
                    onChange={this.setResid.bind(this)}
                  />
                </Form.Group>
              )}
              {Number(this.state.type) === option[2].value && (
                <Form.Group controlId="selectRider">
                  <Form.Label>FT/PT</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={this.setRider.bind(this)}
                  >
                    {riderdropdown}
                  </Form.Control>
                </Form.Group>
              )}
              <Button
                variant="outline-secondary"
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
            {this.state.error && ErrorAlert(this.state.errorMessage)}
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
