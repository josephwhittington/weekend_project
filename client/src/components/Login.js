import React, { Component } from 'react';
import Axios from '../utils/axios';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      username: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value
    }));
  }
  handleSubmit(e) {
    e.preventDefault();
    const { password, username } = this.state;
    const body = { password, username };
    Axios.post('/auth', body).then(data => {
      if (data.hasOwnProperty('data')) {
        if (data.data.hasOwnProperty('user')) {
          if (data.data.user.hasOwnProperty('authToken')) {
            localStorage.setItem('token', data.data.user.authToken);
            localStorage.setItem('user', username);
          }
        }
      }
    });
    Axios.get('/protected').then(data => console.log(data));
    this.setState({
      password: '',
      username: ''
    });
  }
  render() {
    return (
      <div>
        <h1>Made it to the Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type='text'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
