const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    let token = req.headers.token
    console.log(token)

    try {
        if (!token) throw { msg: 'Token not found', status: 400 }
        else {
            let decoded = verifyToken(token)
            // console.log(decoded)
            const user = User.findOne({
                where: { email: decoded.email }
            })
            if (!user) throw { msg: 'Authtentication failed', status: 401 }
            else {
                req.userData = decoded
                next()
            }
        }
    }
    catch (error) {
        next(error)
    }

}

module.exports = authentication  