import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

class App extends Component {
  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  render() {
    return (
      <div className='App'>
        <Navbar bg="dark">
          <Nav.Link><Link to='/'>Home</Link></Nav.Link>
          <Nav.Link><Link to='/login'>Login</Link></Nav.Link>
          <Nav.Link><Link to='/register'>Register</Link></Nav.Link>
          {localStorage.getItem('token') && <Nav.Link><Link to='/feed'>Feed</Link></Nav.Link>}
          <button type='button' onClick={this.logOut}>
            Log Out
          </button>
        </Navbar>
        <div id='main-section'>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/feed' component={Feed} />
        </div>
      </div>
    );
  }
}

export default App;
