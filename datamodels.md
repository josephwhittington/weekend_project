user {
    username: unique String!
    displayName: String!
    password: String!
    membershipDate: datetime! generated
    followers: [User!]!
    followedBy: [Users!]!
}

Auth {
    success: Bool!
    message: String!
    errorCode: String ERROR_ENUM
    token: String
}

Tweet/ text/ code {
    user: User!
    body: String!
    timestamp: Date!
    likedBy: [User!]!
    comments: [Tweets!]!
}

Tweet/ media {
    user: User!
    body: String!
    media: multipart/formdata!
    timestamp: Date!
    likedBy: [User!]!
    comments: [Tweets!]!
}

route data expected
authBody {
    username: String!
    password: String!
}
