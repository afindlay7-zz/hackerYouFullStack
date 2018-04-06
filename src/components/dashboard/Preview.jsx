import React, { Component } from "react";
import styled from 'styled-components';

class Preview extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      alt: '',
    }
  }

  componentWillReceiveProps(propsReceived){
    this.setState({ 
      url: propsReceived.url,
      alt: propsReceived.alt
    });

  }

  render() {
    return (
      <PreviewContainer>
        <img src={this.state.url} alt={this.state.alt}></img>
      </PreviewContainer>
    );
  }
}
  
export default Preview;

const PreviewContainer = styled.div`
  img {
    max-width: 500px;
    height: auto;
    border: 2px solid #DDDDDD;
    border-radius: 4px;
  }
`