const router = require('express').Router()
const UserController = require('../controllers/UserController')
// const apiRouter = require('../routers/apiRouter')

// router.use('/api', apiRouter)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/user', UserController.read)

module.exports = router;