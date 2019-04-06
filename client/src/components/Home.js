import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

export default class Home extends Component {
    componentDidMount(props) {
        localStorage.getItem("token") && this.props.history.push("/feed");
    }
    render() {
        return (
            <div>
                <Navbar push={this.props.history.push} />
                <Jumbotron>
                    <h1>Dev Shout!!</h1>
                    <p>
                        Dev Shout is the first microblogging service built just
                        for Developers. We allow you to share small code
                        snippets and interact with other developers who want to
                        do the same. It's basically twitter but not as evil. Try
                        it out now!
                    </p>
                    <div className="d-flex justify-content-center justify-content-md-start justify-content-lg-start">
                        <Button variant="success" className="d-block">
                            <Link className="text-light" to="/register">
                                Sign Up Now
                            </Link>
                        </Button>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}
