import React, { Component } from "react";
import axios from "axios";

class Info extends Component {
    constructor(){
        super();
        this.state = {
            name: 'castle',
            description: 'my fav place',
            groups: '2018',
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
          <h2>Name</h2>
          <p>{this.state.name}</p>
          <h2>Description</h2>
          <p>{this.state.description}</p>
          <h2>Groups</h2>
          <p>{this.state.groups}</p>
        </div>
      );
    }
}
  
  export default Info;