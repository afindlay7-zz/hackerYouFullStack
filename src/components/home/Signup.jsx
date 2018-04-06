import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Panel, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from "axios";
import styled from 'styled-components';

class Signup extends Component {
  constructor(){
      super();
      this.state = {
        redirectToDashboard: false,
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(){
    // TODO: Front-end validation
    const { firstName, lastName, email, password } = this.state;
    axios.post('/signup', {
      firstName,
      lastName,
      email,
      password
    })
      .then(res => {
        this.setState({ redirectToDashboard: true });
      })
      .catch(err => {
        console.log(err.response);
      });
  }
  
  render() {
    return (
      <SignupContainer>
        <Panel>
          <Panel.Heading>
            <h2>Sign up to photo share!</h2>
          </Panel.Heading>
          <Panel.Body>
              <form>
                  <FormGroup controlId="formControlsFistName">
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl placeholder="Enter first name" type="text" name="firstName" autoComplete='given-name'
                      onChange={this.handleChange}></FormControl>
                  </FormGroup>

                  <FormGroup controlId="formControlsLastName">
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl placeholder="Enter last name" type="text" name="lastName" autoComplete='family-name'
                      onChange={this.handleChange}></FormControl>
                  </FormGroup>

                  <FormGroup controlId="formControlsEmail">
                  <ControlLabel>Email address</ControlLabel>
                  <FormControl placeholder="Enter email" type="email" name="email" autoComplete='email'
                      onChange={this.handleChange}></FormControl>
                  </FormGroup>

                  <FormGroup controlId="formControlsPassword">
                      <ControlLabel>Password</ControlLabel>
                      <FormControl placeholder="Enter password" type="password" name="password" autoComplete='current-password'
                          onChange={this.handleChange}></FormControl>
                  </FormGroup>
              </form>
          </Panel.Body>
          <Panel.Footer>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Sign Up</Button>
          </Panel.Footer>
        </Panel>

        { this.state.redirectToDashboard ? 
          <Redirect to={{pathname: '/dashboard'}} id='redirectToDashboardFromSignup' />
          : null
        }
      </SignupContainer>
    );
  }
}
  
export default Signup;

const SignupContainer = styled.div`
  width: 500px;
  margin: 0 auto;
`