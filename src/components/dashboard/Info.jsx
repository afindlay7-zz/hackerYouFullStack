import React, { Component } from "react";
import Preview from './Preview';
import { Panel, Button, Modal } from 'react-bootstrap';
import axios from "axios";
import styled from 'styled-components';

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
          show: false,
          name: '',
          date: '',
          description: '',
          url: '',
          file: false,
          photoId: ''
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillReceiveProps(propsReceived){
      this.setState({ photoId: propsReceived.id});
      axios.get(`/photos/${propsReceived.id}`)
        .then(res => {
          this.setState({
            name: res.data.payload[0].name,
            date: res.data.payload[0].date,
            description: res.data.payload[0].description,
            url: res.data.payload[0].url
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    handleDelete() {
      axios.delete(`/photos/${this.state.photoId}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.props.refresh();
      this.handleClose();
    }
  
    render() {
      return (
        <InfoContainer>
          <Panel id='info-panel'>
            <Panel.Heading>
              <h2>Panel heading with a title</h2>
            </Panel.Heading>
            <Panel.Body>
              <h3>Name:</h3>
              <p>{this.state.name}</p>
              <h3>Date:</h3>
              <p>{this.state.date}</p>
              <h3>Description:</h3>
              <p>{this.state.description}</p>
              <h3>Groups:</h3>
            </Panel.Body>
            <Panel.Footer>
              <Button bsStyle="danger" onClick={this.handleShow}>Delete</Button>

              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Are you sure you want to delete this photo?
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleClose}>No</Button>
                  <Button bsStyle="primary" onClick={this.handleDelete}>Yes</Button>
                </Modal.Footer>
              </Modal>
            </Panel.Footer>
          </Panel>

          { this.state.url ? 
            <Preview url={this.state.url} alt={this.state.name} num="first"/> :
            <Preview num="second"/>
            }
          
        </InfoContainer>
      );
    }
}
  
export default Info;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 0 15px;
  #info-panel {
    margin: 0;
  }

  @media(max-width: 1224px){
    display: block;
  }
`