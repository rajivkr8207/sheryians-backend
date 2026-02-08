const authMiddleware = require("../middleware/authmiddleware");
const express = require('express');
const NoteModel = require("../models/Note.model");
const jwt = require('jsonwebtoken')
const noteRouter = express.Router()

noteRouter.post('/note', authMiddleware, async (req, res) => {
    const { title, description } = req.body
    if(!title || !description){
        return res.status(400).json({
            message: "title and description is required"
        })
    }
    const note = await NoteModel.create({ title, description, user: req.user.id })
    return res.status(201).json({
        message: "note create successfuly",
        note
    })
})

noteRouter.get('/note', authMiddleware, async (req, res) => {
    const note = await NoteModel.find({user: req.user.id})
    return res.status(200).json({
        message:"note fetch successfully",
        note
    })
})

noteRouter.get('/note/:id', authMiddleware, async (req,res)=>{
    const id = req.params.id;
    const note = await NoteModel.find({_id:id, user: req.user.id})
    if (!note){
        return res.status(400).json({
            message: "note is required"
        })
    }
    return res.status(200).json({
        message:'note fetch successfully',
        note
    })

})

module.exports = noteRouter;