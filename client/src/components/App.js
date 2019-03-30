import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <div id='navbar'>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          <Link />
        </div>
        <div id='main-section'>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='' />
        </div>
      </div>
    );
  }
}

export default App;
