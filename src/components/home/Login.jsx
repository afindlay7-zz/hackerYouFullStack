import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Panel, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from "axios";
import styled from 'styled-components';

class Login extends Component {
    constructor(){
        super();
        this.state = {
          accessToken: '',
          redirectToDashboard: false,
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
      const { email, password } = this.state;
      axios.post('/login', {
        email,
        password
      })
        .then(res => {
          this.setState({ 
            accessToken: res.data.payload,
            redirectToDashboard: true 
          }, () => {
            const options = {
              headers: {
                Authorization: 'Bearer ' + this.state.accessToken
              }
            }
            axios.get('/user/current', options)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err.response);
              });
          });
        })
        .catch(err => {
          console.log(err.response);
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

          { this.state.redirectToDashboard ? 
            <Redirect to={{pathname: '/dashboard'}} id='redirectToDashboardFromLogin' />
            : null
          }
        </LoginContainer>
      );
    }
}
  
  export default Login;

  const LoginContainer = styled.div`
    width: 500px;
    margin: 0 auto;
  `