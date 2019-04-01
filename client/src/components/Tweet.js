import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Card from "react-bootstrap/Card"

export default class Tweet extends Component {
  render() {
    let {body, username, likedBy, comments, media} = this.props.props
    const time = new Date(this.props.props.timestamp)
    const localtime = time.toLocaleTimeString()
    const localdate = time.toLocaleDateString()
    if(media && typeof media === "string") media = `http://localhost:4000/${media.split("\\")[2]}`
    return (
        <Card className="my-3 w-50 mx-auto">
        <Card.Header className="bg-light">
          <Link className="text-dark" to={`/user/${username}`}>@{username}</Link>
        </Card.Header>
        <Card.Body>
        {media && <Card.Img className="d-block mx-auto" variant="img-top" src={media}></Card.Img>}
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
