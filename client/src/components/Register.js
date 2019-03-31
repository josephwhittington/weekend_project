import React, { Component } from 'react';
import Axios from '../utils/axios';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      password: '',
      username: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(
      () => ({
        [name]: value
      }),
      console.log(this.state)
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    const { displayName, password, username } = this.state;
    console.log(this.state, ' is state');
    const body = { displayName, password, username };
    Axios.post('/user/create', body).then(data => console.log(data));
    this.setState({
      displayName: '',
      password: '',
      username: ''
    });
  }
  render() {
    return (
      <div>
        <h1>Made it to the Register Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Display Name:
            <input
              type='text'
              name='displayName'
              value={this.state.displayName}
              onChange={this.handleChange}
            />
          </label>
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
