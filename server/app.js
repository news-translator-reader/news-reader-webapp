require('dotenv').config();
const cors = require('cors')
const express = require('express')
const app = express();
const PORT = 3000;
const router = require('./routers')
const errHandler = require('./middleware/errorhandler')

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errHandler)

app.listen(PORT, () => {
    console.log(`Listening to: ${PORT}`)
})

