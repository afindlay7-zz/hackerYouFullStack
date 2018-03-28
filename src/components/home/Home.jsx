import React, { Component } from "react";
import Signup from './Signup';
import Login from './Login';
import axios from "axios";
import styled from 'styled-components';

class Home extends Component {
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
         
        </div>
      );
    }
}
  
  export default Home;