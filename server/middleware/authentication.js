const {verifyToken} = require('../helpers/bcrypt')
const {User} = require('../models')

async function authentication(req, res, next){
let token = req.headers.token

try{
    if(!token) throw {msg: 'Token not found', status: 400}
    else{
        let decoded = verifyToken(token)
        const user = User.findOne({
            where: { email: decoded.email}
        })
        if (!user) throw { msg: 'Authtentication failed', status: 401}
        else{
            req.userData = decoded
            next()
        }
    }
}
catch (error){
    next(error)
}

}

module.exports = authentication  