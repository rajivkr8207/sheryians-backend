const express = require('express')
const { RegisterContoller, loginController, profileController } = require('../controllers/auth.controllers')

const authRouter = express.Router()

authRouter.post('/register', RegisterContoller)
authRouter.post('/login', loginController)  
authRouter.get('/login', profileController)


module.exports = authRouter