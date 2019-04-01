import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Card from "react-bootstrap/Card"

export default class Tweet extends Component {
  render() {
    const {body, username, likedBy, comments} = this.props.props
    const time = new Date(this.props.props.timestamp)
    const localtime = time.toLocaleTimeString()
    const localdate = time.toLocaleDateString()
    return (
        <Card className="my-3 w-50 mx-auto">
        <Card.Header className="bg-light">
          <Link className="text-dark" to={`/user/${username}`}>@{username}</Link>
        </Card.Header>
        <Card.Body>
          <Card.Text className="text-dark">{body}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <small>On {localdate} @{localtime}</small>
          <span>
          <Card.Link href="#">Retweet</Card.Link>
          <Card.Link href="#">Like</Card.Link>
          </span>
        </Card.Footer>
      </Card>
    )
  }
}
