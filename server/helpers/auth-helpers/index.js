const jwt = require("jsonwebtoken")
const { ENV } = require("../../../configs")

module.exports = {
    generateJwt: (user) => {
        const {username, displayName} = user
        return jwt.sign({ username, displayName }, ENV.SECRET);
    },
    verifyToken: token => {
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, ENV.SECRET)
            return decodedToken
        } catch (e) {
            return null
        }
    }
}