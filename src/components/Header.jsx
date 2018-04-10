import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import styled from 'styled-components';
import { getToken, removeToken } from '../services/tokenService';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      email: null,
      redirectToLogin: false,
      redirectToSignup: false
    }
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToSignup = this.redirectToSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(propsReceived){
    if(propsReceived.email){
      const token = getToken();
      if(token){
        this.setState({ email: propsReceived.email })
      }
    }
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

  handleLogout(){
    removeToken();
    this.props.logout();
    this.setState({ email: null})
  }

  render() {
    return (
      <HeaderContainer>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>Photo-Share</Navbar.Brand>
          </Navbar.Header>
          
            { this.state.email ?
              <Nav pullRight>
                <NavItem>{this.state.email}</NavItem>
                <NavItem onClick={this.handleLogout}>Logout</NavItem>
              </Nav>
              : 
              <Nav pullRight>
                <NavItem onClick={this.redirectToLogin}>Login</NavItem>
                <NavItem onClick={this.redirectToSignup}>Signup</NavItem>
              </Nav>
            }
        </Navbar>
      </HeaderContainer>
    );
  }
}
  
export default Header;

const HeaderContainer = styled.div`
`