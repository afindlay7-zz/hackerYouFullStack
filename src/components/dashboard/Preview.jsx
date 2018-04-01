import React, { Component } from "react";
import styled from 'styled-components';

class Preview extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: ''
    }
  }

  componentWillReceiveProps(propsReceived){
    console.log(propsReceived.url);
    this.setState({ url: propsReceived.url});

  }

  render() {
    return (
      <PreviewContainer>
        <img src={this.state.url} alt="Mountain View"></img>
      </PreviewContainer>
    );
  }
}
  
export default Preview;

const PreviewContainer = styled.div`
  img {
    max-width: 500px;
    height: auto
  }
  background-color: pink;
`