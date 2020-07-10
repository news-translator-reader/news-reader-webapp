const router = require('express').Router()
const ApiController = require('../controllers/ApiController')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.get('/news', ApiController.getNews) // methodnya nanti diganti sesuai fungsi api
router.post('/translate', ApiController.translate) // methodnya nanti diganti sesuai fungsi api
router.get('/read', ApiController.read) // methodnya nanti diganti sesuai fungsi api
