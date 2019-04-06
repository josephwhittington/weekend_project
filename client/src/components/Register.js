import React, { Component } from "react";
import Axios from "../utils/axios";

import Navbar from "./Navbar";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            displayName: "",
            password: "",
            password2: "",
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
        const { displayName, password, username } = this.state;
        console.log(this.state, " is state");
        const body = { displayName, password, username };
        Axios.post("/user/create", body).then(data => {
            data && this.props.history.push("/login");
        });
        this.setState({
            displayName: "",
            password: "",
            username: ""
        });
    }
    render() {
        return (
            <div>
                <Navbar push={this.props.history.push} />
                <h1 className="py-5 text-center">Register for Dev Shout!!</h1>
                <Form className="w-50 mx-auto" onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Display Name: <br />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="displayName"
                            value={this.state.displayName}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-muted">
                            This will show up on your tweets - unlike your
                            username, this can be changed
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Username: </Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <label>Password: </label>
                        <Form.Control
                            type="text"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            isValid={
                                this.state.password === this.state.password2 &&
                                this.state.password !== ""
                            }
                            isInvalid={
                                this.state.password !== this.state.password2
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <label>Verify Password: </label>
                        <Form.Control
                            type="text"
                            name="password2"
                            value={this.state.password2}
                            onChange={this.handleChange}
                            isValid={
                                this.state.password === this.state.password2 &&
                                this.state.password !== ""
                            }
                            isInvalid={
                                this.state.password !== this.state.password2
                            }
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
