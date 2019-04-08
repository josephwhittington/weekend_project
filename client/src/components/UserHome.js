import React, { Component } from "react";
import Axios from "../utils/axios";

import Navbar from "./Navbar";
import Tweet from "./Tweet";
import UserAccount from "./UserAccount";

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
                <Navbar push={this.props.history.push} />
                <UserAccount username={userid}/>
                <ul className="py-0 px-2">
                    {tweets.map(tweet => (
                        <Tweet key={tweet.id} props={tweet} />
                    ))}
                </ul>
            </div>
        );
    }
}
