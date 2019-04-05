import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const setBaseURL = () =>
    process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://onlineshitlist.com";

export default class Tweet extends Component {
    render() {
        let {
            body,
            username,
            displayName,
            likedBy,
            comments,
            media
        } = this.props.props;
        const time = new Date(this.props.props.timestamp);
        const localtime = time.toLocaleTimeString();
        const localdate = time.toLocaleDateString();
        if (media && typeof media === "string")
            media = `${setBaseURL()}/${media.split("\\")[2]}`;
        return (
            <Card className="my-3 w-50 mx-auto">
                <Card.Header className="bg-white border-light">
                    <div className="d-flex align-items-center">
                        <span
                            style={{
                                height: 20,
                                width: 20,
                                backgroundColor: "black"
                            }}
                            className="d-inline-block my-auto rounded-circle mr-2"
                        />
                        <Link className="text-dark" to={`/user/${username}`}>
                            <span className="h4 m-0">
                                <span className="pr-2">{displayName}</span>
                            </span>
                        </Link>
                        <Link className="text-dark" to={`/user/${username}`}>
                            <span className="text-dark pr-3">
                                <Badge variant="info" className="">
                                    @{username}
                                </Badge>
                            </span>
                        </Link>
                    </div>
                    <small className="text-grey">
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
                <Card.Footer className="p-0 bg-white rounded-top">
                    <ButtonGroup className="w-100 rounded-top">
                        <Button className="">Retweet</Button>
                        <Button className="">({comments.length})Comment</Button>
                        <Button className="">({likedBy.length})Like</Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
        );
    }
}
