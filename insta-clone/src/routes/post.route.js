const express = require('express');
const multer = require('multer');
const { CreatePostController } = require('../controllers/post.controller');
const upload = multer({ storage: multer.memoryStorage() })
const PostRouter = express.Router()

PostRouter.post('/create',upload.single('chacha'), CreatePostController)
// PostRouter.post('/login', AuthController.LoginController)
// PostRouter.get('/profile', AuthController.ProfileController)



module.exports = PostRouter;