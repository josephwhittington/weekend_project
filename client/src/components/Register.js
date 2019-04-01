import React, { Component } from 'react';
import Axios from '../utils/axios';

import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'

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
        <h1 className="py-5 text-center">Register for Dev Shout!!</h1>
        <Form className="w-50 mx-auto" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Display Name: <br/></Form.Label>
              <Form.Control
                type='text'
                name='displayName'
                value={this.state.displayName}
                onChange={this.handleChange}
              />
              <Form.Text className="text-muted">
                This will show up on your tweets - unlike your username, this can be changed
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label> Username: </Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <label>Password: </label>
              <Form.Control
                type='text'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type='submit' variant="outline-success" block>Submit</Button>
        </Form>
      </div>
    );
  }
}
