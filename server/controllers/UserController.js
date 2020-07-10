let { User } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static read(req, res) {
        User.findAll()
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(500).json({ err })
            })
    }
    static register(req, res, next) {
        let { email, password, username, location, preferences } = req.body
        if (!email || !password || !username || !location || !preferences) {
            res.status(400).json({ msg: `ERROR, email and password required to register ` })
        }
        else {
            User.create({ email, password, username, location, preferences })
                .then(createduser => {
                    res.status(201).json({ msg: `${email} succesfuly registered` })
                })
                .catch(err => {
                    next(err)
                })
        }
    }

    static login(req, res, next) {
        let { email, password } = req.body;
        if (!email || !password) {
            res.status(404).json({ msg: "Error! email and password required!" })
        }
        else {
            User.findOne({
                where: { email }
            })
                .then(foundUser => {
                    if (!foundUser) throw { msg: "Error! password & email salah" }

                    let cekpassword = bcrypt.comparePassword(password, foundUser.password)
                    if (cekpassword) {
                        // jika berhasil login
                        // bikin token
                        const token = jwt.createToken({ id: foundUser.id, email: foundUser.email, location: foundUser.location, preferences: foundUser.preferences })
                        res.status(200).json({ msg: `${foundUser.email} successfully login`, token })
                    } else {
                        throw { msg: "Error! password & email salah" }
                    }
                })
                .catch(err => {
                    next(err)
                })
        }
    }

    static googleLogin(req, res, next) {
        const { id_token } = req.body;

        let user = null;
        const client = new OAuth2Client(`694334749393-gkplctp7g49o6c9gkh9acu7i0fpoir6l.apps.googleusercontent.com`);
        client.verifyIdToken({
            idToken: id_token,
            audience: `694334749393-gkplctp7g49o6c9gkh9acu7i0fpoir6l.apps.googleusercontent.com`,
        })
            .then(ticket => {
                user = ticket.getPayload()
                // console.log(ticket.getPayload());
                

                return User.findOne({
                    where: { email: user.email }
                })
            }).then(foundUser => {
                if (foundUser) return foundUser
                else {
                    return User.create({
                        username: user.name,
                        email: user.email,
                        location: `id`,
                        preferences: `health`,
                        password: `${user.email}googlesignin`
                    })
                }
            }).then(data => {
                // console.log(data.dataValues, `<<<<<<<<<<<<<<<<`)
                let userData = data.dataValues
                const token = jwt.createToken({ id: userData.id, email: userData.email, location: userData.location, preferences: userData.preferences })
                res.status(200).json({ msg: `${userData.email} successfully login`, token })
            }).catch(err => {
                next(err)
            })

    }

}

module.exports = UserController;