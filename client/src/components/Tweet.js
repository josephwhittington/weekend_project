import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

const setBaseURL = () =>
    process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://onlineshitlist.com";

export default class Tweet extends Component {
    render() {
        let { body, username, likedBy, comments, media } = this.props.props;
        const time = new Date(this.props.props.timestamp);
        const localtime = time.toLocaleTimeString();
        const localdate = time.toLocaleDateString();
        if (media && typeof media === "string")
            media = `${setBaseURL()}/${media.split("\\")[2]}`;
        return (
            <Card className="my-3 w-50 mx-auto">
                <Card.Header className="bg-white border-bottom-0">
                    <span
                        style={{
                            height: 20,
                            width: 20,
                            backgroundColor: "black"
                        }}
                        className="d-inline-block my-auto rounded-circle mr-2"
                    />
                    <Link
                        className="d-inline-block text-dark my-auto"
                        to={`/user/${username}`}
                    >
                        <span className="pr-3">
                            <Badge variant="secondary">@{username}</Badge>
                        </span>
                    </Link>
                    <br />
                    <small>
                        On {localdate} @{localtime}
                    </small>
                </Card.Header>
                <Card.Body>
                    {media && (
                        <Card.Img
                            className="d-block mx-auto"
                            variant="img-top"
                            src={media}
                        />
                    )}
                    <Card.Text className="text-dark">{body}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex bg-white border-top-0 justify-content-between">
                    <span>
                        <Card.Link href="#">Retweet</Card.Link>
                        <Card.Link href="#">({likedBy.length})Like</Card.Link>
                    </span>
                </Card.Footer>
            </Card>
        );
    }
}
