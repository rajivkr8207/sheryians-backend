const Postmodel = require("../models/post.model");
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT,
});

const CreatePostController = async (req, res) => {
    const { caption } = req.body
    const file = req.file
    const token = req.cookies.instatoken
    if (!token) {
        return res.status(401).json({
            message: "token not found",

        })
    }
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: 'user is unautorise'
        })
    }
    const imgurl = await client.files.upload({
        file: await toFile(Buffer.from(file.buffer), 'file'),
        fileName: 'test',
    });

    const post = await Postmodel.create({
        caption,
        user: decoded.id,
        imgUrl: imgurl.url
    })
    return res.status(201).json({
        message: 'post is created successfully',
        post
    })
}


const GetPostController = async (req, res) => {
    const token = req.cookies.instatoken
    if (!token) {
        return res.status(401).json({
            message: "token not found",

        })
    }
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: 'user is unautorise'
        })
    }
    const Allpost = await Postmodel.find({
        user: decoded.id
    })
    return res.status(200).json({
        message: 'post is fetch successfully',
        Allpost
    })
}


const GetPostUsingParams = async (req, res) => {
    const id = req.params.id
    const token = req.cookies.instatoken
    if (!token) {
        return res.status(401).json({
            message: "token not found",

        })
    }
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: 'user is unautorise'
        })
    }
    const post = await Postmodel.findOne({
        _id: id,
        user: decoded.id
    })
    return res.status(200).json({
        message: 'post is fetch successfully',
        post
    })
}


module.exports = {
    CreatePostController,
    GetPostController,
    GetPostUsingParams
}