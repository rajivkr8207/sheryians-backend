const mongoose = require('mongoose')

const PostScheme = new mongoose.Schema({
    caption: {
        type: String,
        required: [true, "caption is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
    imgUrl:{
        type:String,
        required: [true, "imgurl is required"]

    }
    
})

const Postmodel = mongoose.model('Post',PostScheme)
module.exports = Postmodel