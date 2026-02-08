const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: String,
    description: String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true        
    }
}, {timestamps: true})

module.exports = mongoose.model('note', NoteSchema)
