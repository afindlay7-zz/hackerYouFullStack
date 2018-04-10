import React, { Component } from "react";
import { Panel, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { axiosSignup, axiosLogin } from '../../services/userService';

class Signup extends Component {
  constructor(){
      super();
      this.state = {
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
    const { firstName, lastName, email, password } = this.state;

    axiosSignup(firstName, lastName, email, password, (res) => {
      axiosLogin(email, password, (res) => {
        this.props.login();
      });
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

      </SignupContainer>
    );
  }
}
  
export default Signup;

const SignupContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  .panel-footer {
    display: flex;
    justify-content: center;
  }
  .btn-primary{
    width: 30%;
  }
`