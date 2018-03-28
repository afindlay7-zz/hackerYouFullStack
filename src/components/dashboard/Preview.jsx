import React, { Component } from "react";
import { Panel } from 'react-bootstrap';
import styled from 'styled-components';

class Preview extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }
  
    render() {
      return (
        <Container>

        </Container>
      );
    }
}
  
  export default Preview;

  const Container = styled.div`
  width: 400px;
  height: 400px;
  background-color: pink;
  `