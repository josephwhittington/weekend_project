import React, { Component } from "react";

class NotFound extends Component {
    render() {
        return (
            <div
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <div>
                    <h2 className="text-center">Wrong Page</h2>
                    <div
                        style={{
                            backgroundImage:
                                "url(http://tinybun.co/img/comics17/404.jpg)",
                            height: 200,
                            width: 210,
                            backgroundSize: "cover"
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default NotFound;
