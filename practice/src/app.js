const express = require('express');
const app = express()
var cookieParser = require('cookie-parser');
const authrouter = require('./routes/auth.route.js');
const morgan = require('morgan');
const noteRouter = require('./routes/note.route.js');

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))


app.use('/api/auth', authrouter)
app.use('/api', noteRouter)
app.get('/health', (req,res)=>{
    res.send('server is running properly')
})

module.exports = app;