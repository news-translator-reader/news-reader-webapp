const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

function hashPassword(plainpassword){
    return bcrypt.hashSync(plainpassword, salt)
}

function comparePassword(plainpassword, hashedpassword){
    return bcrypt.compareSync(plainpassword, hashedpassword)
}
module.exports = { hashPassword, comparePassword}