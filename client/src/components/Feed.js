import React, { Component } from 'react';
import Axios from '../utils/axios';
import TweetEditor from './TweetEditor';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  async componentDidMount() {
    const user = localStorage.getItem('user');
    let data;
    if (user) {
      data = await Axios.get(`/feed/${user}`);
      data = data.data;
    } else {
      this.props.history.push('/login');
    }
    this.setState(() => ({
      tweets: data.data
    }));
  }
  render() {
    console.log(this.state);
    const tweets = this.state.tweets;

    return (
      <div>
        <TweetEditor />
        <ul>
          {tweets && tweets.map(tweet => <li key={tweet.id}>{tweet.body}</li>)}
        </ul>
      </div>
    );
  }
}
