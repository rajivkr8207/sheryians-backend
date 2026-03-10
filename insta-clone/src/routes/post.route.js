const express = require('express');
const multer = require('multer');
const { CreatePostController, GetPostController, GetPostUsingParams } = require('../controllers/post.controller');
const upload = multer({ storage: multer.memoryStorage() })
const PostRouter = express.Router()

PostRouter.post('/create',upload.single('imageurl'), CreatePostController)
PostRouter.get('/', GetPostController)
PostRouter.get('/:id', GetPostUsingParams)



module.exports = PostRouter;