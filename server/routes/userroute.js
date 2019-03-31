const fs = require("fs")
const express = require("express")
const router = express()

// Helpers
const UserHelpers = require("../helpers/user-helpers")
const MSG = require("../helpers/messaging")

// Get existing userSelect: 
router.get('/:userid', (req, res) => {
    const { userid } = req.params
    // If user exists return user
    if(userid) {
        // Read user file -> parse json -> filter users to look for userid -> assign user obj to user
        const [user] = JSON.parse(fs.readFileSync('./data/users.json', "utf-8")).filter(user => user.username === userid.toLowerCase())
        console.log(user)
        // If user found
        if(user) return res.json(MSG.generateApiResponse("User found", user))
    }
    return res.json(MSG.generateErrorResponse("User not found", "DATA_NOT_FOUND"))
})

// Create new user
router.post('/create', (req, res) => {
    // Assign the body vars to easier-to-use names
    let {username, displayName, password} = req.body

    // Convert username to lowercase
    username = username? username.toLowerCase(): null;

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
        return res.json(MSG.generateErrorResponse("User Exists", "DATA_NOT_UNIQUE"))
    }
    // Add the user to the file - if the username is unique
    userData.push(user)
    fs.writeFileSync('./data/users.json', JSON.stringify(userData), "utf-8")

    // Generate response
    return res.json(MSG.generateApiResponse("Your user was added", user))
});

router.post("/subscribe/:subscriber/:account", (req, res) => {
    let { subscriber, account } = req.params
    subscriber = subscriber.toLowerCase()
    account = account.toLowerCase()

    // If the subscriber and account dont exist throw error;
    if(!subscriber || !account) return res.json(MSG.generateErrorResponse("could not subscribe", "ARGS_MISSING_PARAMETERS"))

    // Read user data for both user
    const userData = JSON.parse(fs.readFileSync('./data/users.json'))
    const users = userData.filter(user => user.username === subscriber || user.username === account)
    
    // Pull user data
    const [subscriberData] = users.filter(user => user.username === subscriber)
    const [accountData] = users.filter(user => user.username === account)
    // Pull index of userdata to be used later for writing data
    const subscriberIndex = users.map(user => user.username).indexOf(subscriber)
    const accountIndex = users.map(user => user.username).indexOf(account)

    // If subscriber or user not found, throw error 
    if(!accountData || !subscriberData) return res.json(MSG.generateErrorResponse("could not subscribe", "DATA_NOT_FOUND"))

    // If all the users exist then add data to related data
    // Add subscriber to account's followers
    if(Array.isArray(accountData.followers)) {
       // Check if the subscriber s already subscribed
       if(accountData.followers.includes(subscriber)) return res.json(MSG.generateErrorResponse("could not subscribe", "DATA_REDUNDANT_ACCOUNT_ALREADY_FOLLOWED"))
       // Add the subscriber to the accounts followers
       accountData.followers.push(subscriber)
       // Add the account to the user's following list
       if(Array.isArray(subscriberData.following)) {
           subscriberData.following.push(account)
       } 
       subscriberData.following = [account]

       // Write data to global object 
       users[subscriberIndex] = subscriberData;
       users[accountIndex] = accountData;

       fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf-8")

       return res.json(MSG.generateApiResponse("Subscribed successfully"))
    } else {
       // Add the subscriber to the accounts followers
       accountData.followers = [subscriber]
       // Add the account to the user's following list
       subscriberData.following = [account]

       // Write data to global object 
       users[subscriberIndex] = subscriberData;
       users[accountIndex] = accountData;

       fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf-8")
       return res.json(MSG.generateApiResponse("Subscribed successfully"))
    }
})

router.post('/unsubscribe/:subscriber/:account', (req, res) => {
    let { subscriber, account } = req.params

    // If the subscriber and account dont exist throw error;
    if(!subscriber || !account) return res.json(MSG.generateErrorResponse("could not subscribe", "ARGS_MISSING_PARAMETERS"))

    // Read user data for both user
    const userData = JSON.parse(fs.readFileSync('./data/users.json'))
    const users = userData.filter(user => user.username === subscriber || user.username === account)
    
    // Pull user data
    const [subscriberData] = users.filter(user => user.username === subscriber)
    const [accountData] = users.filter(user => user.username === account)
    // Pull index of userdata to be used later for writing data
    const subscriberIndex = users.map(user => user.username).indexOf(subscriber)
    const accountIndex = users.map(user => user.username).indexOf(account)

    // If subscriber or user not found, throw error 
    if(!accountData || !subscriberData) return res.json(MSG.generateErrorResponse("could not subscribe", "DATA_NOT_FOUND"))

    // Check if the subscriber is on the followers list of account
    const subscriberFollowIndex = accountData.followers.indexOf(subscriber) != -1? accountData.followers.indexOf(subscriber) : null
    const accountFollowingIndex = subscriberData.following.indexOf(account) != -1? subscriberData.following.indexOf(account): null
    if(subscriberFollowIndex === null) return res.json(MSG.generateErrorResponse("User not subscribed", "LOGIC_ERROR_USER_NOT_SUBSCRIBED"))

    // Here we can asume that the user is subscribed and remove them
    accountData.followers.splice(subscriberFollowIndex, 1)

    // If the subscriber is folowing the account- remove it
    if(accountFollowingIndex !== null) {
        subscriberData.following.splice(accountFollowingIndex, 1)
    }

    // Replace global user date with local changes and persist
    userData[accountIndex] = accountData
    userData[subscriberIndex] = subscriberData

    fs.writeFileSync("./data/users.json", JSON.stringify(userData), "utf-8")

    return res.json(MSG.generateApiResponse("Successfully unsubscribed"))
})

// Get list of people a particular user is following
router.get("/following/:userid", (req, res) => {
    let { userid: username } = req.params
    username = username? username.toLowerCase(): null;
    
    // Pull in the user data and filter to the user
    const [userData] = JSON.parse(fs.readFileSync("./data/users.json", "utf-8")).filter(user => user.username === username)

    // If user doesn't exist throw api error 
    if(!userData) return res.json("User not found", "DATA_NOT_FOUND")

    // If we get to this point we ave a user - isolate user following list
    const following = Array.isArray(userData.following)? userData.following: []

    return res.json(MSG.generateApiResponse("User found", following))
})

// Get list of people a particular user is followedBy
router.get("/followers/:userid", (req, res) => {
    let { userid: username } = req.params
    username = username? username.toLowerCase(): null;
    
    // Pull in the user data and filter to the user
    const [userData] = JSON.parse(fs.readFileSync("./data/users.json", "utf-8")).filter(user => user.username === username)

    // If user doesn't exist throw api error 
    if(!userData) return res.json(MSG.generateErrorResponse("User not found", "DATA_NOT_FOUND"))

    // If we get to this point we ave a user - isolate user following list
    const following = Array.isArray(userData.followers)? userData.followers: []

    return res.json(SMG.generateApiResponse("User found"), following)
})

module.exports = router