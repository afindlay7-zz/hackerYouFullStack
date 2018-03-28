import React, { Component } from "react";
import Info from './Info';
import axios from "axios";
import styled from 'styled-components';

class Tree extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    componentDidMount() {
      axios.get("/photos").then(res => {
        console.log(res.data);
      });
    }
  
    render() {
      return (
        <div>
          <Info />
        </div>
      );
    }
}
  
  export default Tree;