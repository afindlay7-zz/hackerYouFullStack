import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Panel, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { axiosLogin } from '../../services/userService';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      accessToken: '',
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      userDoesNotExistError: false,
      incorrectPasswordError: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validateForm(){
    this.setState({
      emailError: false,
      passwordError: false,
      userDoesNotExistError: false,
      incorrectPasswordError: false
    });
    let errorCount = 0;
    if (this.state.email === ''){
      errorCount++;
      this.setState({ 
        emailError: true 
      });
    }
    if (this.state.password === ''){
      errorCount++;
      this.setState({ 
        passwordError: true 
      });
    }
    if (!errorCount){
      this.handleSubmit();
    }
  }

  handleSubmit(){
    const { email, password } = this.state;
    axiosLogin(email, password, (res, userError, passwordError) => {
      if (userError){
        this.setState({
          userDoesNotExistError: true
        });
      } else if (passwordError){
        this.setState({
          incorrectPasswordError: true
        });
      } else if (res){
        this.props.login();
      }
    });
  }
  
  render() {
    return (
      <LoginContainer>
        <Panel>
          <Panel.Heading>
            <h2>Welcome back, please login</h2>
          </Panel.Heading>
          <Panel.Body>
            <Form>
              <FormGroup controlId="formControlsEmail">
              <ControlLabel>Email address</ControlLabel>
              <FormControl placeholder="Enter email" type="email" name="email" autoComplete='email'
                  onChange={this.handleChange}></FormControl>
              </FormGroup>
              { this.state.emailError ? <p className='validation-error'>Email is required</p> : null }

              <FormGroup controlId="formControlsPassword">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl placeholder="Enter password" type="password" name="password" autoComplete='current-password'
                      onChange={this.handleChange}></FormControl>
              </FormGroup>
              { this.state.passwordError ? <p className='validation-error'>Password is required</p> : null }

              { this.state.userDoesNotExistError ? 
                <p>Oops, looks like this user does not exists, please <Link to='/signup' id='linkToSignupFromLogin'>Sign up here</Link></p> 
                : null 
              }
              { this.state.incorrectPasswordError ? <p className='validation-error'>Incorrect password, please try again</p> : null }

            </Form>
          </Panel.Body>
          <Panel.Footer>
            <Button bsStyle="primary" onClick={this.validateForm}>Login</Button>
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
  .validation-error{
    color: red;
    font-style: italic;
  }
  #linkToSignupFromLogin{
    text-decoration: underline;
  }
`