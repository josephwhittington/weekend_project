import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar push={this.props.history.push} />
                <Jumbotron className="mt-3">
                    <h1>Dev Shout!!</h1>
                    <p>
                        Dev Shout is the first microblogging service built just
                        for Developers. We allow you to share small code
                        snippets and interact with other developers who want to
                        do the same. It's basically twitter but not as evil. Try
                        it out now!
                    </p>
                    <p>
                        <Button variant="success">
                            <Link className="text-light" to="/register">
                                Sign Up Now
                            </Link>
                        </Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}
