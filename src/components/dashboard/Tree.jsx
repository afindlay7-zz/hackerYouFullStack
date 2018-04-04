import React, { Component } from "react";
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Info from './Info';
import axios from "axios";
import styled from 'styled-components';

class Tree extends Component {
  constructor(props){
    super(props);
    this.state = {
      photos: [],
      idOfPhotoToDisplay: ''
    }
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(propsReceived) {
    if (propsReceived.refresh){
      this.handleRefresh(propsReceived.idOfPhotoToFeature);
    }
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleClick(id) {
    this.setState({ idOfPhotoToDisplay: id });
  }

  handleRefresh(id){
    axios.get("/photos")
      .then(res => {
        if(res.data.payload){
          this.setState({ photos: res.data.payload });
          if (id === undefined){
            this.setState({ idOfPhotoToDisplay: res.data.payload[0]._id });
          } else {
            this.setState({ idOfPhotoToDisplay: id});
          }
          
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  render() {
    return (
      <TreeContainer>
        <Panel id='tree-panel'>
          <Panel.Heading>Panel heading</Panel.Heading>
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
  padding: 15px;
  #tree-panel{
    min-width: 200px;
    height: 100%;
  }
`
