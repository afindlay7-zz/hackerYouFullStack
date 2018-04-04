import React, { Component } from "react";
import Banner from './Banner';
import Tree from './Tree';
// import styled from 'styled-components';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      onRefresh: false,
      idOfNewPhoto: ''
    }
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh(idOfPhotoAdded) {
    this.setState({ 
      onRefresh: true,
      idOfNewPhoto: idOfPhotoAdded
    });
  }

  render() {
    return (
      <div>
        <Banner 
          refresh={this.handleRefresh}/>
        <Tree 
          refresh={this.state.onRefresh}
          idOfPhotoToFeature={this.state.idOfNewPhoto}
          />
      </div>
    );
  }
}
  
export default Dashboard;