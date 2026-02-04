const mongoose = require('mongoose')


const todoschema = new mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const todo = mongoose.model('todo', todoschema)

module.exports = todo