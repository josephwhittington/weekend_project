import React, { Component } from 'react';
import Axios from '../utils/axios';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
  }
  async componentDidMount() {
    const { userid } = this.props.match.params;
    const data = await Axios.get(`/tweet/history/${userid}`);
    const tweets = data.data.data;
    console.log(tweets);
    this.setState({ tweets });
  }
  render() {
    const { userid } = this.props.match.params;
    const { tweets } = this.state;
    return (
      <div>
        <h1>{localStorage.getItem('user')}'s Tweets</h1>
        <ul>
          {tweets.map(tweet => (
            <li key={tweet.id}>{tweet.body}</li>
          ))}
        </ul>
      </div>
    );
  }
}
