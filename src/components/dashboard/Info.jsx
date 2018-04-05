import React, { Component } from "react";
import Preview from './Preview';
import { Panel, Button, Modal, Form, FormGroup, FormControl, ControlLabel, Radio } from 'react-bootstrap';
import axios from "axios";
import styled from 'styled-components';

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
          showEditModal: false,
          showDeleteModal: false,
          name: '',
          updatedName: '',
          date: '',
          updatedDate: '',
          description: '',
          updatedDescription: '',
          url: '',
          updatedUrl: '',
          file: false,
          photoId: ''
        }
        this.handleShowEditModal = this.handleShowEditModal.bind(this);
        this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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
          console.log(err.response);
        });
    }

    handleShowEditModal() {
      this.setState({ showEditModal: true });
    }

    handleShowDeleteModal() {
      this.setState({ showDeleteModal: true });
    }

    handleClose() {
      this.setState({ 
        showEditModal: false,
        showDeleteModal: false,
      });
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleEdit(e) {
      let { name, updatedName, date, updatedDate, description, updatedDescription, url, updatedUrl, photoId } = this.state;   
      if (updatedName !== ''){
        name =  updatedName;
      }
      if (updatedDate !== ''){
        date = updatedDate 
      }
      if (updatedDescription){
        description = updatedDescription;
      }
      if (updatedUrl !== null){
        url =  updatedUrl;
      }

      axios.put('/photos', {
          name,
          date,
          description,
          url, 
          photoId
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.props.refresh(photoId);
      this.handleClose();
    }

    handleDelete() {
      axios.delete(`/photos/${this.state.photoId}`)
        .then(res => {
          console.log(res.data.payload);
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
              <h2>{this.state.name}</h2>
            </Panel.Heading>

            <Panel.Body>
              <h3>Date:</h3>
              <p>{this.state.date}</p>
              <h3>Description:</h3>
              <p>{this.state.description}</p>
              <h3>Groups:</h3>
              { this.state.url ? 
                <Preview url={this.state.url} alt={this.state.name} num="first"/> :
                <Preview num="second"/>
                }
            </Panel.Body>

            <Panel.Footer id="info-panel-footer">
              <Button bsStyle="primary" onClick={this.handleShowEditModal}>Edit</Button>
              <Button bsStyle="danger" onClick={this.handleShowDeleteModal}>Delete</Button>

              <Modal show={this.state.showEditModal} onHide={this.handleClose}>
                <Form>
                  <Modal.Header closeButton>
                    <Modal.Title>Photo Information</Modal.Title>
                  </Modal.Header>
                  
                  <Modal.Body>
                    <FormGroup controlId="formControlsText">
                      <ControlLabel>Name</ControlLabel>
                      <FormControl 
                        defaultValue={this.state.name}
                        type="text" 
                        name="updatedName" 
                        onChange={this.handleChange}>
                      </FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsText">
                      <ControlLabel>Date</ControlLabel>
                      <FormControl 
                        defaultValue={this.state.date}
                        type="text" 
                        name="updatedDate" 
                        onChange={this.handleChange}>
                      </FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Description</ControlLabel>
                      <FormControl 
                        componentClass="textarea" 
                        defaultValue={this.state.description}
                        name="updatedDescription" 
                        onChange={this.handleChange}>
                      </FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsSelectMultiple">
                      <ControlLabel>Groups</ControlLabel>
                      <FormControl componentClass="select" multiple>
                        <option value="select">G1</option>
                        <option value="other">G2</option>
                        <option value="other">G3</option>
                      </FormControl>
                    </FormGroup>

                    <FormGroup>
                      <Radio name="radioGroup" inline>
                        <FormGroup controlId="formControlsText">
                          <ControlLabel>URL</ControlLabel>
                          <FormControl 
                            placeholder={this.state.url}
                            type="text"
                            name="updatedUrl" 
                            onChange={this.handleChange}>
                          </FormControl>
                        </FormGroup>
                      </Radio>

                      <Radio name="radioGroup" inline>
                        <FormGroup controlId="formControlsFile">
                          <ControlLabel>File</ControlLabel>
                          <FormControl 
                            type="file"
                            name="file"
                            onChange={this.handleFileUpload}>
                          </FormControl>
                        </FormGroup>
                      </Radio>
                    </FormGroup>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.handleEdit}>Save Changes</Button>
                    <Button onClick={this.handleClose}>Close</Button>
                  </Modal.Footer>
                </Form>
              </Modal>
              
              <Modal show={this.state.showDeleteModal} onHide={this.handleClose}>
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
        </InfoContainer>
      );
    }
}
  
export default Info;

const InfoContainer = styled.div`
  min-width: 500px;
  display: flex;
  justify-content: space-between;
  padding: 0 0 0 15px;
  #info-panel {
    margin: 0;
  }
  #info-panel-footer {
    display: flex;
    justify-content: space-between;
  }


  @media(max-width: 1224px){
    display: block;
  }
`