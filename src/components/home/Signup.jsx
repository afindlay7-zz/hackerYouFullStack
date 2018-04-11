import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Panel, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { axiosSignup, axiosLogin } from '../../services/userService';

class Signup extends Component {
  constructor(){
      super();
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
        matchPasswordError: false,
        userExistsError: false
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
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      matchPasswordError: false
    });
    let errorCount = 0;
    if (this.state.firstName === ''){
      errorCount++;
      this.setState({ 
        firstNameError: true
      });
    }
    if (this.state.lastName === ''){
      errorCount++;
      this.setState({ 
        lastNameError: true 
      });
    } 
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
    if (this.state.confirmPassword === ''){
      errorCount++;
      this.setState({ 
        confirmPasswordError: true 
      });
    }
    if (this.state.password !== this.state.confirmPassword){
      errorCount++;
      this.setState({ 
        matchPasswordError: true 
      });
    } 
    if (!errorCount){
      this.handleSubmit();
    }
  }

  handleSubmit(){
    const { firstName, lastName, email, password } = this.state;

    axiosSignup(firstName, lastName, email, password, (res, err) => {
      if(err){
        this.setState({
          userExistsError: true
        });
      } else if (res) {
        axiosLogin(email, password, (res) => {
          this.props.login();
        });
      }
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
            <Form>
                <FormGroup controlId="formControlsFistName">
                <ControlLabel>First Name</ControlLabel>
                <FormControl placeholder="Enter first name" type="text" name="firstName" autoComplete='given-name'
                  onChange={this.handleChange}></FormControl>
                </FormGroup>
                { this.state.firstNameError ? <p className='validation-error'>First name is required</p> : null }

                <FormGroup controlId="formControlsLastName">
                <ControlLabel>Last Name</ControlLabel>
                <FormControl placeholder="Enter last name" type="text" name="lastName" autoComplete='family-name'
                  onChange={this.handleChange}></FormControl>
                </FormGroup>
                { this.state.lastNameError ? <p className='validation-error'>Last name is required</p> : null }

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

                <FormGroup controlId="formControlsPasswordConfirm">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl placeholder="Re-type password" type="password" name="confirmPassword" autoComplete='current-password'
                        onChange={this.handleChange}></FormControl>
                </FormGroup>
                { this.state.confirmPasswordError ? <p className='validation-error'>Please confirm your password</p> : null }
                { this.state.matchPasswordError ? <p className='validation-error'>Passwords do not match</p> : null }
                { this.state.userExistsError ? 
                  <p>Oops, looks like this account already exists, <Link to='/login' id='linkToLoginFromSignup'>Login here</Link></p> 
                  : null 
                }

            </Form>
          </Panel.Body>

          <Panel.Footer>
            <Button bsStyle="primary" onClick={this.validateForm}>Sign Up</Button>
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
  .validation-error{
    color: red;
    font-style: italic;
  }
  #linkToLoginFromSignup{
    text-decoration: underline;
  }
`