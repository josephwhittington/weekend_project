const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Routers
const AuthRoute = require('./routes/authroute')
const UserRoute = require('./routes/userroute.js')

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


// Sample Protected route
app.get('/protected', authenticateRoute, (req, res) => {
    console.log(req.decodedToken)

    res.json({
        success: true,
        message: "Your authenticated user has access to this route"
    })
})

app.listen(4000, console.log("Starting Server..."));