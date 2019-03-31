import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';

class App extends Component {
  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

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
          {localStorage.getItem('token') && <Link to='/feed'>Feed</Link>}
          <button type='button' onClick={this.logOut}>
            Log Out
          </button>
        </div>
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
