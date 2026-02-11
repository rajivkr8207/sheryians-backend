const Usermodel = require("../models/user.model");
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const RegisterController = async (req, res) => {
    const { fullname, username, email, password, bio, profile_image } = req.body
    console.log(username, email, fullname);
    const isUseralreadyexist = await Usermodel.findOne({ username })

    if (isUseralreadyexist) {
        return res.status(409).json({
            message: 'user is already exist'
        })
    }
    const hashPassword = crypto.createHash('sha256').update(password).digest('hex')


    const user = await Usermodel.create({
        username,
        fullname,
        email,
        password: hashPassword,
        bio,
        profile_image,
    })

    return res.status(201).json({
        message: "user is created successfully",
        user: user
    })
}



const LoginController = async (req, res) => {
    const { username, email, password } = req.body

    const isUseralreadyexist = await Usermodel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select('+password')
    if (!isUseralreadyexist) {
        return res.status(409).json({
            message: 'user is  not exist'
        })
    }

    const hashPassword = crypto.createHash('sha256').update(password).digest('hex')
    const isPassword = hashPassword == isUseralreadyexist.password
    if (!isPassword) {
        return res.status(409).json({
            message: 'invalid credintial'
        })
    }
    const token = jwt.sign({ id: isUseralreadyexist._id }, process.env.JWT_SECRET,{expiresIn:"3d"})
    res.cookie('token', token)
    return res.status(200).json({
        message: "user is login successfully",
        token
    })
}


const ProfileController = async (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
        return res.status(409).json({
            message:"token is expired"
        })
    }
    const user = await Usermodel.findOne({ _id: decoded.id })
    return res.status(200).json({
        message: "profile fetch successfully",
        user
    })
}
module.exports = {
    RegisterController,
    LoginController,
    ProfileController
}