const AuthHelpers = require("../../helpers/auth-helpers")

module.exports = {
    extractUsernamefromJWT: (req, res, next) => {
        // Get token from request
        let token = req.headers.authorization
        // Strip token
        token = token.split(" ")[1]

        // Get decoded token
        const decodedToken = AuthHelpers.verifyToken(token)
        req.username = decodedToken.username
        
        next();
    }
}