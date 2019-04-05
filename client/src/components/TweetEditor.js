import React, { Component } from "react";
import Axios from "../utils/axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default class TweetEditor extends Component {
    constructor() {
        super();
        this.state = {
            username: localStorage.getItem("user"),
            body: ""
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
        const res = await Axios.post("/tweet/text", data);
        console.log(res);
        this.setState(() => ({
            body: ""
        }));
    }
    render() {
        return (
            <div className="w-50 mx-auto">
                <Form
                    className="mt-2 w-100 mx-auto"
                    onSubmit={this.handleSubmit}
                >
                    <Form.Control
                        as="textarea"
                        rows="2"
                        cols="45"
                        style={{ resize: "none" }}
                        value={this.state.body}
                        onChange={this.handleChange}
                        placeholder="New Tweet"
                    />
                    <Button
                        variant="outline-success"
                        className="mt-1"
                        type="submit"
                        block
                    >
                        Send
                    </Button>
                </Form>
            </div>
        );
    }
}
