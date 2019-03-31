const fs = require('fs');
const express = require('express');
const router = express();

// Helpers
const AuthHelpers = require('../helpers/auth-helpers');
const UserHelpers = require('../helpers/user-helpers');

// Authenticate user
router.post('/', (req, res) => {
  let { username, password } = req.body;

  // Translate the username to lowercase
  username = typeof username === "string"? username.toLowerCase(): null;

  // Check if the user exists
  const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
  const usernames = UserHelpers.getUsernames(userData);

  // Check if username exists
  if (usernames.includes(username)) {
    // Check if entered password matches the stored password
    if (password !== undefined && typeof password === 'string') {
      // If password matches authenticate user
      // Pull user from userdata
      const [user] = userData.filter(user => user.username === username);
      // Generate token
      const authToken = AuthHelpers.generateJwt(user);
      // Add auth token to user object
      user.authToken = authToken;

      // Generate response
      return res.json({
        success: true,
        message: 'Your user was authenticated',
        user
      });
    }
  }
  // Generate response
  return res.json({
    success: false,
    message: 'Incorrect username of password'
  });
});

module.exports = router;
