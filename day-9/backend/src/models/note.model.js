const mongoose = require('mongoose')

const noteschema = new mongoose.Schema({
    title: String,
    description: String
})

const note = mongoose.model('notes', noteschema)

module.exports = note