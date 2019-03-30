const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Import helpers
const UserHelpers = require('./helpers/user-helpers')
const AuthHelpers = require('./helpers/auth-helpers')

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

// Create new user
app.post('/user/create', (req, res) => {
    // Assign the body vars to easier-to-use names
    let {username, displayName, password} = req.body

    // Convert username to lowercase
    username = username.toLowerCase();

    // Generate user object
    const user = {
        username,
        displayName,
        password,
        membershipDate: new Date()
    }

    // File I/O 
    // Read the file and assign to variable
    const userData = JSON.parse(fs.readFileSync('./data/users.json', "utf-8"));

    // Check if the user is already in the file
    // Create array of just usernames to save memory
    const usernames = UserHelpers.getUsernames(userData);
    // If the user exists throw error
    if(usernames.includes(username.toLowerCase())) {
        // Generate response
        return res.json({
            success: false,
            message: "User Exists",
            errorCode: "DATA_NOT_UNIQUE"
        })
    }
    // Add the user to the file - if the username is unique
    userData.push(user)
    fs.writeFileSync('./data/users.json', JSON.stringify(userData), "utf-8")

    // Generate response
    return res.json({
        success: true,
        message: "Your user was added",
        user
    })
});

// Authenticate user
app.post('/auth', (req, res) => {
    let {username, password} = req.body
    
    // Translate the username to lowercase
    username = username.toLowerCase()

    // Check if the user exists
    const userData = JSON.parse(fs.readFileSync('./data/users.json', "utf-8"))
    const usernames = UserHelpers.getUsernames(userData)

    // Check if username exists
    if(usernames.includes(username)) {
        // Check if entered password matches the stored password
        if(password !== undefined && typeof password === "string") {
            // If password matches authenticate user
            // Pull user from userdata
            const [user] = userData.filter(user => user.username === username)
            // Generate token
            const authToken = AuthHelpers.generateJwt(user)
            // Add auth token to user object
            user.authToken = authToken

            // Generate response
            return res.json({
                success: true,
                message: "Your user was authenticated",
                user
            })
        }
    }
    // Generate response
    return res.json({
        success: false,
        message: "Incorrect username of password"
    })
})

// Sample Protected route
app.get('/protected', authenticateRoute, (req, res) => {
    console.log(req.decodedToken)

    res.json({
        success: true,
        message: "Your authenticated user has access to this route"
    })
})

app.listen(4000, console.log("Starting Server..."));