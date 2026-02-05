const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: String
})

const user = mongoose.model('users', userSchema)

module.exports = user;
