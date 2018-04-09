import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import styled from 'styled-components';
import { getToken, removeToken } from '../services/tokenService';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      redirectToLogin: false,
      redirectToSignup: false
    }
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToSignup = this.redirectToSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(propsReceived){
    if(propsReceived.refresh){
      const token = getToken();
      if(token){
        this.setState({ isLoggedIn: true })
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
    this.props.setUser(null);
    this.setState({ isLoggedIn: false})
  }

  
  render() {
    return (
      <HeaderContainer>
        <Navbar id='navbar'>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Photo-Share</a>
            </Navbar.Brand>
          </Navbar.Header>
          
            { this.state.isLoggedIn ?
              <Nav>
                <NavItem onClick={this.handleLogout}>Logout</NavItem>
              </Nav>
              : 
              <Nav>
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