import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Axios from '../utils/axios';

export default class TweetEditor extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem('user'),
      body: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState(() => ({
      body: value
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { body, username } = this.state;
    const data = { body, username };
    const res = await Axios.post('/tweet/text', data);
    console.log(res);
    this.setState(() => ({
      body: ''
    }));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h3>New Tweet</h3>
          </label>
          <br />
          <label>
            <textarea
              rows='2'
              cols='45'
              style={{ resize: 'none' }}
              value={this.state.body}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <Button variant='outline-success' type='submit'>
            Send
          </Button>
        </form>
      </div>
    );
  }
}
