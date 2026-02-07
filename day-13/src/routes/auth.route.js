
const express = require('express')
const user = require('../models/user.model.js')
const jwt = require('jsonwebtoken');
const authRouter = express.Router()
const crypto = require('crypto')
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const emailexist = await user.findOne({ email })
    if (emailexist) {
        return res.status(400).json({
            message: "email already exist "
        })
    }

    const hashpassword = crypto.createHash('sha256').update(password).digest('hex');

    const User = await user.create({ name, email, password: hashpassword })
    return res.status(201).json({
        message: "user register successfully",
        User
    })
})

authRouter.post('/protected', async (req, res) => {
    return res.status(200).json({
        message: "you are in protected route"
    })
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const User = await user.findOne({ email })
    if (!User) {
        return res.status(400).json({
            message: "email does not exist "
        })
    }

    const ispassword = User.password == crypto.createHash('sha256').update(password).digest('hex');
    if (!ispassword) {
        return res.status(400).json({
            message: "invalid password"
        })
    }

    const token = await jwt.sign({ id: User._id }, process.env.JWT_SECRET)
    res.cookie('jwt_cookie', token)
    return res.status(200).json({
        message: "User login successfully",
        User
    })
})

authRouter.get('/login', async (req, res) => {
    const decoded = req.cookies.jwt_cookie
   
    const data = jwt.verify(decoded, process.env.JWT_SECRET)
    if (!data) {
        return res.status(401).json({
            message: "unauthorized"
        })
    }
    const User = await user.findById(data.id)
    if (!User) {
        return res.status(400).json({
            message: "email does not exist "
        })
    }


    return res.status(200).json({
        message: "User fetch successfully",
        User
    })
})



module.exports = authRouter
