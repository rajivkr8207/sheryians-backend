const express = require('express')
const User = require('../models/User.model')
const authrouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

authrouter.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;

    const emailexist = await User.findOne({ email })
    if (emailexist) {
        return res.status(400).json({
            message: "email is already exists"
        })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ fullname, email, password: passwordHash })
    return res.status(201).json({
        message: "User has created successfully",
        user
    })
})

authrouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "email is not exists"
        })
    }

    const passwordexist = await bcrypt.compare(password, user.password)
    if (!passwordexist) {
        return res.status(400).json({
            message: 'invalid credinsitial'
        })
    }

    const jwttoken = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie('shery', jwttoken)
    return res.status(200).json({
        message: "login successfully"
    })

})

authrouter.get('/profile', async (req, res) => {
    const token = req.cookies.shery
    if (!token) {
        return res.send(400).json({
            message: 'please login first'
        })
    }
    const data = jwt.verify(token, process.env.JWT_SECRET)

    const user  = await User.findById(data.id)
    return res.status(200).json({
        message: "profile fetch successfully",
        user
    })

})


module.exports = authrouter