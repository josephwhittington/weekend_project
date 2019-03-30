const fs = require("fs");
const path = require("path")
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Set up express to serve images folder statically
app.use(express.static(path.join(__dirname, "data/files")))

// Routers
const AuthRoute = require('./routes/authroute')
const UserRoute = require('./routes/userroute.js')
const TweetRouter = require('./routes/tweet')

// Import helpers
const UserHelpers = require('./helpers/user-helpers')

// Import custom middleware
const { authenticateRoute } = require('./middleware/auth-middleware')

// Link up third-party middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Reset data on start
// Comment out to persist data
// APP WLL NOT WORK IF THIS CODE IS UNCOMMENTED AND NODEMON IS RUNNING
// const init_data = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
// if(typeof init_data == "object" && init_data.length !== 0) {
//     fs.writeFileSync("./data/users.json", JSON.stringify([]), "utf-8")
// }

// Routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/tweet', TweetRouter)

// Sample Protected route
app.get('/protected', authenticateRoute, (req, res) => {
    console.log(req.decodedToken)

    res.json({
        success: true,
        message: "Your authenticated user has access to this route"
    })
})

app.listen(4000, console.log("Starting Server..."));