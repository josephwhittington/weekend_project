import React, { Component } from "react";
import Axios from "../utils/axios";

import Navbar from "./Navbar";

import TweetEditor from "./TweetEditor";
import Tweet from "./Tweet";

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    async componentDidMount() {
        const user = localStorage.getItem("user");
        let data;
        if (user) {
            data = await Axios.get(`/feed/${user}`);
            data = data.data;
        } else {
            this.props.history.push("/login");
        }
        this.setState(() => ({
            tweets: data.data
        }));
    }
    render() {
        console.log(this.state);
        const tweets = this.state.tweets;

        return (
            <div className="">
                <Navbar push={this.props.history.push} />
                <TweetEditor />
                <div className="px-2">
                    {tweets &&
                        tweets.map(tweet => (
                            <Tweet key={tweet.id} props={tweet}>
                                {tweet.body}
                            </Tweet>
                        ))}
                </div>
            </div>
        );
    }
}
