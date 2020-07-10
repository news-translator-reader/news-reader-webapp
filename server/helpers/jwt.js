const jwt = require('jsonwebtoken')
const secretkey = "rahasia"

function createToken(payload) {
    return jwt.sign(payload, secretkey)
}

function verifyToken(token) {
    return jwt.verify(token, secretkey)
}

module.exports = { createToken, verifyToken }