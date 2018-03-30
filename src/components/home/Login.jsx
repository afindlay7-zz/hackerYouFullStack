import React, { Component } from "react";
import { Panel, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
// import axios from "axios";
import styled from 'styled-components';

class Login extends Component {
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
        <LoginContainer>
          <Panel>
            <Panel.Heading>
              <h2>Welcom back, please login</h2>
            </Panel.Heading>
            <Panel.Body>
                <form>
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
              <Button bsStyle="primary" onClick={this.handleShow}>Login</Button>
            </Panel.Footer>
          </Panel>

        </LoginContainer>
      );
    }
}
  
  export default Login;

  const LoginContainer = styled.div`
    width: 500px;
    margin: 0 auto;
  `