import React, { Component } from "react";
// import { Redirect } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import styled from 'styled-components';

class Footer extends Component {
    // constructor(){

    // }
  
    render() {
      return (
        <FooterContainer id="footer-container">
          <Navbar id='navbar'>
            <Nav>
              <NavItem>FAQ</NavItem>
              <NavItem>Terms and Conditions</NavItem>
              <NavItem>Contact Us</NavItem>
              <NavItem>Privacy Policy</NavItem>
            </Nav>
          </Navbar>
        </FooterContainer>
      );
    }
}
  
  export default Footer;

  const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;

    #navbar {
      margin: 0;
      height: 100px;
    }
  `