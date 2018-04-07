import React, { Component } from "react";
import Banner from './Banner';
import Tree from './Tree';
import styled from 'styled-components';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      accessToken: '',
      onRefresh: false,
      idOfNewPhoto: ''
    }
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state){
      this.setState({ accessToken: this.props.location.state.accessToken });
    }
  }

  handleRefresh(idOfPhotoAdded) {
    this.setState({ 
      onRefresh: true,
      idOfNewPhoto: idOfPhotoAdded
    });
  }

  render() {
    return (
      <DashboardContainer>
        <Banner 
          refresh={this.handleRefresh}
          accessToken={this.state.accessToken}/>
        <Tree 
          refresh={this.state.onRefresh}
          idOfPhotoToFeature={this.state.idOfNewPhoto}
          accessToken={this.state.accessToken}
          />
      </DashboardContainer>
    );
  }
}
  
export default Dashboard;

const DashboardContainer = styled.div`
  min-height: calc(100vh - 100px);
`