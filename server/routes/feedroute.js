const fs = require("fs");
const express = require("express");
const router = express();

// Helpers
const MSG = require("../helpers/messaging");

// Get the first 100 tweets from a user's feed
router.get("/:userid", (req, res) => {
    let { userid: username } = req.params;
    username = typeof username === "string" ? username.toLowerCase() : null;

    // Find all the people who the person is subscribed to and aggregate all their tweets
    let tweets = JSON.parse(fs.readFileSync("./data/tweets.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const [user] = users.filter(user => user.username === username);
    const following = user.following;
    // Filter all the tweets by tweets for tweets by people in the following list
    const filteredTweets = tweets.filter(tweet =>
        following.includes(tweet.username)
    );
    if (tweets && user && user.displayName) {
        tweets = tweets.map(tweet => {
            tweet.displayName = user.displayName;
        });
    }
    // Clip tweets to only inlucde 100
    if (filteredTweets.length > 100)
        filteredTweets = filteredTweets.slice(0, 101);
    return res.json(MSG.generateApiResponse("Hi there", filteredTweets));
});

module.exports = router;
