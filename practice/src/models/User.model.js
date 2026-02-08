const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullname: String,
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: String
})

const user = mongoose.model('user', UserSchema)

module.exports = user