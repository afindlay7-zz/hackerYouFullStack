import React, { Component } from "react";
import { Panel, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { axiosLogin } from '../../services/userService';

class Login extends Component {
  constructor(){
      super();
      this.state = {
        accessToken: '',
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
    const { email, password } = this.state;
    axiosLogin(email, password, (res) => {
      this.props.getCurrentUser();
    });
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
            <Button bsStyle="primary" onClick={this.handleSubmit}>Login</Button>
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
  min-height: calc(100vh - 100px);
  .panel-footer {
    display: flex;
    justify-content: center;
  }
  .btn-primary{
    width: 30%;
  }
`