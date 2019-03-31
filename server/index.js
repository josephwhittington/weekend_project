const fs = require("fs");
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Set up express to serve images folder statically
app.use(express.static(path.join(__dirname, "data/files")))
app.use(cors())

// Routers
const AuthRoute = require('./routes/authroute')
const UserRoute = require('./routes/userroute.js')
const TweetRouter = require('./routes/tweet')
const FeedRoute = require('./routes/feedroute')

// Import helpers
const UserHelpers = require('./helpers/user-helpers')

// Import custom middleware
const { authenticateRoute } = require('./middleware/auth-middleware')

// Link up third-party middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/tweet', TweetRouter)
app.use('/feed', FeedRoute)

// Sample Protected route
app.get('/protected', authenticateRoute, (req, res) => {
    console.log(req.decodedToken)

    res.json({
        success: true,
        message: "Your authenticated user has access to this route"
    })
})

app.listen(4000, console.log("Starting Server..."));