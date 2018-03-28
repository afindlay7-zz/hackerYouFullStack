import React, { Component } from "react";
import {  Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from "axios";

class Banner extends Component {
    constructor(){
        super();
        this.state = {
            show: false,
            name: '',
            date: '',
            description: '',
            groups: '',
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  
    handleSubmit() {
      console.log(this.state);
      axios.post('/photos/' + this.state.name)
        .then(res => {
          console.log(res);
        });
    }

    render() {
      return (
        <div>
          <Button bsStyle="primary" onClick={this.handleShow}>Add Photo</Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <form>
              <Modal.Header closeButton>
                <Modal.Title>Photo Information</Modal.Title>
              </Modal.Header>
              
              <Modal.Body>
                <FormGroup controlId="formControlsText">
                  <ControlLabel>Name</ControlLabel>
                  <FormControl placeholder="Enter photo name" type="text" name="name" 
                    onChange={this.handleChange}></FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsText">
                  <ControlLabel>Date</ControlLabel>
                  <FormControl placeholder="Date photo was taken" type="text" name="date" 
                    onChange={this.handleChange}></FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Enter a description of your photo" name="description" 
                    onChange={this.handleChange}></FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsSelectMultiple">
                  <ControlLabel>Groups</ControlLabel>
                  <FormControl componentClass="select" multiple>
                    <option value="select">G1</option>
                    <option value="other">G2</option>
                    <option value="other">G3</option>
                  </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsText">
                  <ControlLabel>URL</ControlLabel>
                  <FormControl placeholder="Enter photo url" type="text"></FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsFile">
                  <ControlLabel>File</ControlLabel>
                  <FormControl help="Example block-level help text here." type="file"></FormControl>
                </FormGroup>
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this.handleSubmit}>Submit</Button>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      );
    }
}
  
  export default Banner;