import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/Footer'
import styled from 'styled-components';


class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
            <Footer />
          </div>
        </Router>
    );
  }
}

export default App;

const Container = styled.div`
  padding: 40px;
`

const Body = styled.div`
  padding: 30px;
`