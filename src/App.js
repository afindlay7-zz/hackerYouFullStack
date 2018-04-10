import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Header from './components/Header';
import Login from './components/home/Login';
import Signup from './components/home/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/Footer';
import { axiosGetUser } from './services/userService';
import { getToken } from './services/tokenService';

class App extends Component {
  state = {
    user: null,
    email: ''
  };

  componentDidMount(){
    this.getCurrentUser();
  }

  setUser = (user) => {
    this.setState({ user });
  }

  getCurrentUser = () => {
    const token = getToken();
    if(token){
      axiosGetUser(token, (res) => {
        this.setState({ 
          user: res, 
          email: res.email 
        });
      });
    }
  }
  
  render() {
    return (
        <Router>
          <div>
            <Header setUser={this.setUser} email={this.state.email}/>
            <Switch>
              <Route exact path='/login' render={ () => 
                  this.state.user ? <Redirect to="/" /> : <Login getCurrentUser={this.getCurrentUser}/>
                } 
              />

              <Route exact path='/signup' render={ () => 
                  this.state.user ? <Redirect to='/' /> : <Signup setUser={this.setUser}/>
                } 
              />

              <Route path='/' render={ () => 
                  this.state.user ? <Dashboard /> : <Redirect to='/login' />
                }
              />
              
            </Switch>
            <Footer />
          </div>
        </Router>
    );
  }
}

export default App;

