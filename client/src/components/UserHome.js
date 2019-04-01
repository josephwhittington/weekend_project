import React, { Component } from 'react';
import Axios from '../utils/axios';

import Tweet from "./Tweet"

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
        <h3 className="my-3 text-center">{userid}'s Tweets</h3>
        <ul>
          {tweets.map(tweet => (
            <Tweet key={tweet.id} props={tweet}/>
          ))}
        </ul>
      </div>
    );
  }
}
