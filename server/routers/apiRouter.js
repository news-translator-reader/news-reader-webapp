const router = require('express').Router()
const ApiController = require('../controllers/ApiController')

router.get('/news', ApiController.getNews) // methodnya nanti diganti sesuai fungsi api
router.get('/translate', ApiController.translate) // methodnya nanti diganti sesuai fungsi api
router.get('/read', ApiController.read) // methodnya nanti diganti sesuai fungsi api

module.exports = router;