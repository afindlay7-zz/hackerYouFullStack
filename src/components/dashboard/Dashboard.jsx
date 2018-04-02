import React, { Component } from "react";
import Banner from './Banner';
import Tree from './Tree';
// import styled from 'styled-components';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      onRefresh: false
    }
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    this.setState({ onRefresh: true });
  }

  render() {
    return (
      <div>
        <Banner 
          refresh={this.handleRefresh}/>
        <Tree 
          refresh={this.state.onRefresh}/>
      </div>
    );
  }
}
  
export default Dashboard;