import React, { Component } from "react";

import "./styles/UserAccount.css"

import Button from "react-bootstrap/Button"

export default class extends Component {
    render() {
        const {username} = this.props
        return (
            <div>
                <div style={{
                        height: "35vh", 
                        width: "100vw", 
                        "backgroundImage": "url(https://source.unsplash.com/random)", 
                        backgroundSize: "cover",
                        backgroundColor: "#706661"
                    }}
                >
                </div>
                <div className="col-sm-6 col-lg-3 d-block mx-auto" style={{transform: "translate3d(0, -10vh, 0)"}}>
                    <div 
                        className="profile mx-auto"
                        style={{
                            border: "1px solid lightgrey", 
                            backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRamTDnUsC2ueFidJbKBssTtKdMxUuChb5M8AxqOICDeTd_n2Os)",
                            borderRadius: 500,
                            backgroundSize: "cover"
                    }}>
                    </div>
                    <h5 className="mb-3 mt-2 text-center">@{username}</h5>
                    <Button className="d-block mx-auto" variant="outline-info">Follow</Button>
                </div>
            </div>);
    }
}
