const express = require('express');
const AuthController = require('../controllers/auth.controller');

const authRouter = express.Router()

authRouter.post('/register', AuthController.RegisterController)
authRouter.post('/login', AuthController.LoginController)
authRouter.get('/profile', AuthController.ProfileController)



module.exports = authRouter;