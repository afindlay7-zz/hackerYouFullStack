import React, { Component } from "react";
import Banner from './Banner';
import Tree from './Tree';
import axios from "axios";
import styled from 'styled-components';

class Dashboard extends Component {
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
          <Banner />
          <Tree />
        </div>
      );
    }
}
  
  export default Dashboard;