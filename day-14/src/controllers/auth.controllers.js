
const Usermodel = require('../models/User.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')



const RegisterContoller = async (req, res) => {
    const { fullName, email, password } = req.body

    const alreadyexist = await Usermodel.find({ email })

    if (alreadyexist) {
        return res.status(409).json({
            message: "email already exist"
        })
    }

    const user = await Usermodel.create({
        fullName,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex')
    })

    return res.status(201).json({
        message: "user has been created",
        user
    })

}

const loginController = async (req, res) => {
    const { email, password } = req.body
    const user = await Usermodel.findOne({ email })

    if (!user) {
        return res.status(409).json({
            message: "invalid creadential user not found"
        })
    }
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const hashpassword = hash == user.password
    if (!hashpassword) {
        return res.status(409).json({
            message: "invalid creadential passoword"
        })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie(process.env.TOKEN_NAME, token)

    return res.status(200).json({
        message: "user is login successfully"
    })
}

const profileController = async (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
        return res.status(401).json({
            message: "unauthorized"
        })
    }
    const user = await Usermodel.findOne({ _id: decoded.id })

    return res.status(200).json({
        message: "user profile",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
}

module.exports = {
    RegisterContoller,
    loginController,
    profileController
}



