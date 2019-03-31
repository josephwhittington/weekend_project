import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default class NavbarCustom extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <Navbar bg='dark'>
          <Nav.Link>
            <Link to='/'>Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to='/login'>Login</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to='/register'>Register</Link>
          </Nav.Link>
          {localStorage.getItem('token') && (
            <Nav.Link>
              <Link to='/feed'>Feed</Link>
            </Nav.Link>
          )}
          {localStorage.getItem('token') && (
            <button type='button' onClick={this.logOut}>
              Log Out
            </button>
          )}
        </Navbar>
      </div>
    );
  }
}
