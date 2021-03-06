import React, { Component } from "react";
import Axios from "../utils/axios";

import Navbar from "./Navbar";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            username: ""
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
        const { password, username } = this.state;
        const body = { password, username };
        Axios.post("/auth", body).then(data => {
            if (data.hasOwnProperty("data")) {
                if (data.data.hasOwnProperty("user")) {
                    if (data.data.user.hasOwnProperty("authToken")) {
                        localStorage.setItem("token", data.data.user.authToken);
                        localStorage.setItem("user", username);
                        this.props.history.push("/feed");
                    }
                }
            }
        });
        Axios.get("/protected").then(data => console.log(data));
        this.setState({
            password: "",
            username: ""
        });
    }
    render() {
        return (
            <div>
                <Navbar push={this.props.history.push} />
                <h1 className="py-5 text-center">Login To Dev Shout!!</h1>
                <Form
                    className="col-xs-12 col-md-8 col-lg-4 mx-auto"
                    onSubmit={this.handleSubmit}
                >
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button type="submit" variant="outline-success" block>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
