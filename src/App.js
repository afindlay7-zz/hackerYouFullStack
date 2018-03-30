import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/home/Home';
import Login from './components/home/Login';
import Signup from './components/home/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
            <Footer />
          </div>
        </Router>
    );
  }
}

export default App;

