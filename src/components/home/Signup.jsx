import React, { Component } from "react";
import { Panel, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
// import axios from "axios";
import styled from 'styled-components';

class Signup extends Component {
    constructor(){
        super();
        this.state = {
          show: false,
          name: '',
          date: '',
          description: '',
        }
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
                    <FormGroup controlId="formControlsText">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl placeholder="Enter first name" type="text" name="firstName" 
                        onChange={this.handleChange}></FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsText">
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl placeholder="Enter last name" type="text" name="lastName" 
                        onChange={this.handleChange}></FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsEmail">
                    <ControlLabel>Email address</ControlLabel>
                    <FormControl placeholder="Enter email" type="email" name="email" 
                        onChange={this.handleChange}></FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsPassword">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl placeholder="Enter password" type="password" name="password" 
                            onChange={this.handleChange}></FormControl>
                    </FormGroup>
                </form>
            </Panel.Body>
            <Panel.Footer>
              <Button bsStyle="primary" onClick={this.handleShow}>Sign Up</Button>
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
  `