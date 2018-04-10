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
  constructor(){
    super()
    this.state = {
      isLoggedIn: false,
      email: ''
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    this.login();
  }

  logout(){
    this.setState({ isLoggedIn: false });
  }

  login(){
    const token = getToken();
    if(token){
      axiosGetUser(token, (res) => {
        this.setState({ 
          isLoggedIn: true, 
          email: res.email 
        });
      });
    }
  }
  
  render() {
    return (
        <Router>
          <div>
            <Header logout={this.logout} email={this.state.email}/>
            <Switch>
              <Route exact path='/login' render={ () => 
                  this.state.isLoggedIn ? <Redirect to='/' /> : <Login login={this.login}/>
                } 
              />

              <Route exact path='/signup' render={ () => 
                  this.state.isLoggedIn ? <Redirect to='/' /> : <Signup login={this.login}/>
                } 
              />

              <Route path='/' render={ () => 
                  this.state.isLoggedIn ? <Dashboard /> : <Redirect to='/login' />
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

