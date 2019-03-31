import React, { Component } from 'react';
import Axios from '../utils/axios';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      password: ''
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
    const { displayName, password } = this.state;
    console.log(this.state, ' is state');
    Axios.post('/auth').then(data => console.log(data));
    this.setState({
      displayName: '',
      password: ''
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
