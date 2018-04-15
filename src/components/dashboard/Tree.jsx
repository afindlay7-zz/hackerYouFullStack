import React, { Component } from "react";
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import styled from 'styled-components';
import Info from './Info';
import { axiosGetAllPhotos } from '../../services/photoService';
import { getToken } from '../../services/tokenService';

class Tree extends Component {
  constructor(props){
    super(props);
    this.state = {
      accessToken: '',
      photos: [],
      idOfPhotoToDisplay: ''
    }
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(propsReceived) {
    if (propsReceived.refresh){
      // Case 1: New photo is added, view defaults to that photo
      this.handleRefresh(propsReceived.idOfPhotoToFeature);
    } else {
      // Case 2: On page refresh, default to first photo
      this.handleRefresh();
    }
  }

  componentDidMount(){
    const token = getToken();
    this.setState({ 
      accessToken: token 
    }, () => {
      this.handleRefresh();
    });
  }

  handleClick(id) {
    this.setState({ idOfPhotoToDisplay: id });
  }

  handleRefresh(id){
    axiosGetAllPhotos(this.state.accessToken, (res) => {
      if (res){
        this.setState({ photos: res });
        if (id){
          // Case 1
          this.setState({ idOfPhotoToDisplay: id });
        } else {
          // Case 2
          this.setState({ idOfPhotoToDisplay: res[0]._id });
        }
      }
    });
  }
  
  render() {
    return (
      <TreeContainer>
        <Panel>
          <Panel.Heading>My Photos</Panel.Heading>
          <ListGroup>
            { this.state.photos.map((photo, i) => (
                <ListGroupItem
                  onClick={() => this.handleClick(photo._id)} 
                  key={i}>{photo.name}
                </ListGroupItem>
              ))}
          </ListGroup>
        </Panel>

        <Info   
          id={this.state.idOfPhotoToDisplay}
          refresh={this.handleRefresh}/>
      </TreeContainer>
    );
  }
}
  
export default Tree;

const TreeContainer = styled.div`
  display: flex;
  padding: 30px;
  .panel{
    min-width: 200px;
    height: 100%;
  }
  .panel-heading{
    font-weight: bold;
  }
`
