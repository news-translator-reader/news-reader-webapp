const router = require('express').Router()
const apiRouter = require('../routers/apiRouter')
const UserController = require('../controllers/UserController')

router.use('/api', apiRouter)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/user', UserController.read)

module.exports = router;