
const express = require('express')
const user = require('../models/user.model.js')
const jwt = require('jsonwebtoken');
const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const emailexist = await user.findOne({ email })
    if (emailexist) {
        return res.status(400).json({
            message: "email already exist "
        })
    }

    const User = await user.create({ name, email, password })
    const token = await jwt.sign({ id: User._id, email: User.email }, process.env.JWT_SECRET)
    res.cookie('jwt_cookie', token)
    return res.status(201).json({
        message: "user register successfully",
        User
    })
})





module.exports = authRouter
