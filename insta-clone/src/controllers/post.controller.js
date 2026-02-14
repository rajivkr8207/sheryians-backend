const Postmodel = require("../models/post.model");
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT,
});

const CreatePostController = async (req, res) => {
    const { caption, user } = req.body
    const file = req.file
    const token = req.cookies.instatoken
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






module.exports = {
    CreatePostController
}