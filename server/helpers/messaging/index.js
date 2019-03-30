module.exports = {
    generateApiResponse: (message, data) => {
        let msg = {
            success: true,
            message
        }
        if(data) {
            msg.data = data
            return msg
        }
        return msg
    },
    generateErrorResponse: (message, errorCode) => {
        return {
            success: false,
            message,
            errorCode
        }
    }
}