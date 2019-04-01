const fs = require('fs');
const shortid = require('shortid');
const multer = require('multer');
const express = require('express');
const router = express();

// Middleware
const FileMiddleware = require('../middleware/file-middleware');

// Multer setup
const storage = multer.diskStorage({
  destination: function(req, file, next) {
    next(null, 'data/files');
  },
  filename: function(req, file, next) {
    next(null, req.username + '-' + Date.now() + '.jpg');
  }
});

const upload = multer({ storage: storage });

// Helpers
const MSG = require('../helpers/messaging');

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'route accessed'
  });
});

// Get all tweets by a specific user
router.get('/history/:userid', (req, res) => {
  let { userid: username } = req.params;
  username = username ? username.toLowerCase() : null;
  const tweets = JSON.parse(fs.readFileSync('./data/tweets.json', 'utf-8'));
  const tweetsByUser = tweets.filter(tweet => tweet.username === username);
  return res.json(MSG.generateApiResponse('Tweets Found', tweetsByUser));
});

// Post text tweet
router.post('/text', (req, res) => {
  let { body, username } = req.body;
  username = username ? username.toLowerCase() : null;

  // If params are missing - just throw an error and be on our merry way
  if (!username || !body)
    return res.json(
      MSG.generateErrorResponse('Missing params', 'DATA_MISSING_PARAMS')
    );

  // If all the data is legit persist - but first add some metadata
  const tweet = {
    id: shortid.generate(),
    username,
    body,
    timestamp: new Date(),
    likedBy: [],
    comments: []
  };

  // Read in the tweet data
  const tweets = JSON.parse(fs.readFileSync('./data/tweets.json', 'utf-8'));

  // Add new tweet to in-memory data
  tweets.push(tweet);
  // Persist
  fs.writeFileSync('./data/tweets.json', JSON.stringify(tweets), 'utf-8');

  res.json(MSG.generateApiResponse('Hooray', tweet));
});

// Get tweet bu tweetid
router.get('/:tweetid', (req, res) => {
  const { tweetid: id } = req.params;

  // If the tweet param doesn't exist then end function
  if (!id)
    return res.json(
      MSG.generateErrorResponse('Missing params', 'DATA_MISSING_PARAMS')
    );

  // Read tweets into memory
  const tweets = JSON.parse(fs.readFileSync('./data/tweets.json', 'utf-8'));
  const tweet = tweets.filter(tweet => tweet.id === id);

  // If tweet doesn't exist - chill
  if (!tweet)
    res.json(MSG.generateErrorResponse('Tweet not found', 'DATA_NOT_FOUND'));

  // If this code runs, the tweet exists - return it

  res.json(MSG.generateApiResponse('Tweet found', tweet));
});

// Like a tweet
router.post('/like/:tweetid/:userid', (req, res) => {
  let { tweetid: id, userid: username } = req.params;
  username = username ? username.toLowerCase() : null;

  // If for some reason we're missing params throw an error
  if (!id || !username)
    return res.json(
      MSG.generateErrorResponse('Missing params', 'DATA_MISSING_PARAMS')
    );

  // I would normally check to make sure the user exists

  // Username is id exist at this point
  // Read the tweets into memory
  const tweets = JSON.parse(fs.readFileSync('./data/tweets.json', 'utf-8'));
  const tweetIndex = tweets.map(tweet => tweet.id).indexOf(id);
  const [tweet] = tweets.filter(tweet => tweet.id === id);

  // Assuming the user exists - add user to likedBy - if they're not aready in there
  if (!tweet.likedBy.includes(username)) tweet.likedBy.push(username);

  // Copy local chages to global data
  tweets[tweetIndex] = tweet;

  // Persist the data
  fs.writeFile('./data/tweets.json', JSON.stringify(tweets), 'utf-8');

  res.json(MSG.generateApiResponse('like worked', tweets[tweetIndex]));
});

// Unlike a tweet
router.post('/unlike/:tweetid/:userid', (req, res) => {
  let { tweetid: id, userid: username } = req.params;
  username = username ? username.toLowerCase() : null;

  // If for some reason we're missing params throw an error
  if (!id || !username)
    return res.json(
      MSG.generateErrorResponse('Missing params', 'DATA_MISSING_PARAMS')
    );

  // I would normally check to make sure the user exists

  // Username is id exist at this point
  // Read the tweets into memory
  const tweets = JSON.parse(fs.readFileSync('./data/tweets.json', 'utf-8'));
  const tweetIndex = tweets.map(tweet => tweet.id).indexOf(id);
  const [tweet] = tweets.filter(tweet => tweet.id === id);

  // The tweet exists
  // If the user acutally liked the tweet - unlike it
  if (tweet.likedBy.includes(username)) {
    tweet.likedBy = tweet.likedBy.filter(userName => userName !== username);
  }

  // Copy local changes to global state
  tweets[tweetIndex] = tweet;

  // Persist
  fs.writeFileSync('./data/tweets.json', JSON.stringify(tweets), 'utf-8');

  res.json(MSG.generateApiResponse('unlike worked', tweets[tweetIndex]));
});

router.post(
  '/media',
  FileMiddleware.extractUsernamefromJWT,
  upload.single('file'),
  (req, res) => {
    const imagePath = req.file.path;

    let { body, userid: username } = req.body;
    username = username ? username.toLowerCase() : null;

    // If params are missing - just throw an error and be on our merry way
    if (!username)
      return res.json(
        MSG.generateErrorResponse('Missing params', 'DATA_MISSING_PARAMS')
      );

    // If all the data is legit persist - but first add some metadata
    const tweet = {
      id: shortid.generate(),
      username,
      body,
      media: imagePath,
      timestamp: new Date(),
      likedBy: [],
      comments: []
    };

    // Read in the tweet data
    const tweets = JSON.parse(fs.readFileSync('./data/tweets.json', 'utf-8'));

    // Add new tweet to in-memory data
    tweets.push(tweet);
    // Persist
    fs.writeFileSync('./data/tweets.json', JSON.stringify(tweets), 'utf-8');

    res.json(MSG.generateApiResponse('Hooray', tweet));
  }
);

module.exports = router;
