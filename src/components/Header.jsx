import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
    constructor(){
      super();
      this.state = {
        redirectToLogin: false,
        redirectToSignup: false
      }
      this.redirectToLogin = this.redirectToLogin.bind(this);
      this.redirectToSignup = this.redirectToSignup.bind(this);
    }

    redirectToLogin() {
      this.setState({ 
        redirectToSignup: false,
        redirectToLogin: true
      });
    }

    redirectToSignup() {
      this.setState({ 
        redirectToLogin: false,
        redirectToSignup: true
      });
    }

  
    render() {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem onClick={this.redirectToLogin}>Login</NavItem>
            { this.state.redirectToLogin ? 
              <Redirect to={{pathname: '/login'}} id='redirectToLoginFromHeader' />
              : null
            }
            <NavItem onClick={this.redirectToSignup}>Signup</NavItem>
            { this.state.redirectToSignup ? 
              <Redirect to={{pathname: '/signup'}} id='redirectToSignupFromHeader' />
              : null
            }
          </Nav>
        </Navbar>
      );
    }
}
  
  export default Header;