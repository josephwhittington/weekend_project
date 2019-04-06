import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";

export default class NavbarCustom extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.props.push("/");
    }
    render() {
        return (
            <div>
                <Navbar bg="dark">
                    {!localStorage.getItem("token") && (
                        <Link className="p-2 text-light" to="/">
                            Home
                        </Link>
                    )}
                    {!localStorage.getItem("token") && (
                        <Link className="p-2 text-light" to="/register">
                            Register
                        </Link>
                    )}
                    {!localStorage.getItem("token") && (
                        <Link className="p-2 text-success" to="/login">
                            Login
                        </Link>
                    )}
                    {localStorage.getItem("token") && (
                        <Link className="p-2 text-light" to="/feed">
                            Feed
                        </Link>
                    )}
                    {localStorage.getItem("user") && (
                        <Link
                            className="p-2 text-primary"
                            to={`/user/${localStorage.getItem("user")}`}
                        >
                            Account
                        </Link>
                    )}
                    {localStorage.getItem("token") && (
                        <span
                            className="p-2 text-danger"
                            onClick={this.logOut}
                            style={{ cursor: "pointer" }}
                        >
                            Log Out
                        </span>
                    )}
                </Navbar>
            </div>
        );
    }
}
