import React, { Component } from "react";
import Header from './components/header/Header';
import Info from './components/info/Info';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Info />
      </div>
    );
  }
}

export default App;
