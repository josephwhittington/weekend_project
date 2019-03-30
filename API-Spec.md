# API

## User
-   POST /user/create
    -   Creates new User
-   GET /user:userid
    -   Gets specific user
-   POST /user/subscribe/:subscriber/:account
    -   Subscribes subscriber to account
-   POST /user/unsubscribe/:subscriber/:account
    -   Unsububscribes subscriber from account
-   GET /user/following/:userid
    -   Returns a list of all accounts the user is subscribed to
-   GET /user/followers/:userid
    -   Returns a list of all accounts the user is being followed by

## Auth
-   POST /auth
    -   Authenticates user and returns a token

## Tweet

-   POST /tweet/code
    -   Might be the same route as /tweet/text
-   POST /tweet/text
    -   Regular tweets/ maybe links
-   POST /tweet/media
    -   File Upload
-   GET /tweet/:tweetid
    -   Gets specific tweet and associated thread
-   POST tweet/:tweetid/comment
    -   Adds comment to specific tweet
-   GET /tweet/:tweetid/code
    -   Might be the same route as /tweet/:tweetid/text
-   GET /tweet/:tweetid/text
    -   Gets tweet
-   GET /tweet/:tweetid/media
    -   Gets media file
-   POST /tweet/like/:tweetid/:userid
    -   Gets Tweet

## Feed
-   GET /feed/:userid
    -   Returns collection of 100 tweets from the user's subscriptions