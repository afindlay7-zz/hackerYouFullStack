import React, { Component } from "react";
import Info from './Info';
import axios from "axios";
import styled from 'styled-components';

class Tree extends Component {
  constructor(){
    super();
    this.state = {
      photos: [],
      idOfPhotoToDisplay: 'parent'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get("/photos")
      .then(res => {
        if(res.data.payload){
          this.setState({
            photos: res.data.payload,
            idOfPhotoToDisplay: res.data.payload[0]._id
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    
  }

  handleClick(id) {
    this.setState({
      idOfPhotoToDisplay: id
    })
  }
  
  render() {
    return (
      <TreeContainer>
        <div className="tree">
          <ul>
            { this.state.photos.map((photo, i) => (
              <li 
                onClick={() => this.handleClick(photo._id)} 
                key={i}>{photo.name}
              </li>
            ))}
          </ul>
        </div>

        <Info id={this.state.idOfPhotoToDisplay}/>
      </TreeContainer>
    );
  }
}
  
export default Tree;

const TreeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`