let {User} = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserController {
    static read(req, res){
            User.findAll()
            .then( data =>{
                res.status(200).json({data})
            })
            .catch( err =>{
                res.status(500).json({err})
            })
        }
    static register(req, res, next){
        let { email, password, username, location, preferences} = req.body
        if(!email || !password || !username || !location || !preferences ){
            res.status(400).json({msg: `ERROR, email and password required to register `})
        }
        else{
            User.create({email, password, username, location, preferences})
            .then(createduser => {
                res.status(201).json({msg: `${email} succesfuly registered`})
            })
            .catch(err =>{
            next(err)
            })
        }
    }

    static login(req, res, next) {
            let {email, password} = req.body;
    
            if(!email || !password){
                res.status(404).json({msg: "Error! email and password required!"})
            }
            else{
                User.findOne({
                    where : {email}
                })
                .then(foundUser =>{
                    if (!foundUser) throw {msg: "Error! password & email salah"}
                   
                    let cekpassword = bcrypt.comparePassword(password, foundUser.password)
                    if (cekpassword){
                        // jika berhasil login
                        // bikin token
                        const token = jwt.createToken({id: foundUser.id, email: foundUser.email})
                        res.status(200).json({msg: `${foundUser.email} successfully login`, token})
                    } else {
                        throw {msg: "Error! password & email salah"}
                    }
                })
                .catch(err => {
                   next(err)
                })
            }
        }

}

module.exports = UserController;