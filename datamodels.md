user {
    username: unique String!
    displayName: String!
    password: String!
    membershipDate: datetime! generated
    followers: [Username!]!
    following: [Username!]!
}

Auth {
    success: Bool!
    message: String!
    errorCode: String ERROR_ENUM
    token: String
}

Tweet/ text/ code {
    id: uuid!
    username: Username!
    body: String!
    timestamp: Date! generated
    likedBy: [Username]! generated
    comments: [Tweets!]! generated
}

Tweet/ media {
    id: uuid! generated
    username: Username!
    body: String!
    media: urlstring! generated
    timestamp: Date! generated
    likedBy: [Usernames]! generated
    comments: [Tweets!]! generated
}

route data expected
authBody {
    username: String!
    password: String!
}
