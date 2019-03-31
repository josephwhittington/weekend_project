import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';
import Navbar from './Navbar';
import UserHome from './UserHome';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div id='main-section'>
          <Route path='/' component={Navbar} />
          <Route path='/user/:userid' component={UserHome} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/feed' component={Feed} />
        </div>
      </div>
    );
  }
}

export default App;
