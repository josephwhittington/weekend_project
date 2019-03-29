module.exports = {
    getUsernames: userData => userData.map(user => user.username)
}

/* Documentation
getUsernames(userData): returns an Array of usernames for userdata found in server/data/users.json 

*/