const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.route')
const app = express()
// const multer  = require('multer')
const PostRouter = require('./routes/post.route')

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())



app.use('/api/auth', authRouter)
app.use('/api/post', PostRouter)




module.exports = app