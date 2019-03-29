const AuthHelpers = require('../../helpers/auth-helpers')

module.exports = {
    authenticateRoute: (req, res, next) => {
        // Get token from request
        let token = req.headers.authorization
        // Strip token
        token = token.split(" ")[1]

        // Get decoded token
        const decodedToken = AuthHelpers.verifyToken(token)

        // If token is null it means the verification failed
        if(!decodedToken) {
            res.json({
                success: false,
                message: "Invalid Token",
                errorCode: "AUTH_TOKEN_INVALID"
            })
        }
        // If token valid add the decoded token to the request header
        req.decodedToken = decodedToken
        next();
    }
}