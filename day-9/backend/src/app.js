const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())
const note = require('./models/note.model.js')

app.get('/api/notes', async (req, res) => {
    const data = await note.find()

    return res.status(200).json({
        message: 'data fectched',
        data
    })
})

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    await note.findByIdAndDelete(id)
    return res.status(204).json({
        message: 'note delete succcessfuly'
    })
})




app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body

    const data = await note.create({ title, description })
    return res.status(201).json({
        message: "note create successfully",
        data: data

    })
})

app.patch('/api/notes/:id', async (req, res) => {
    const { description } = req.body

    await note.findByIdAndUpdate(req.params.id, { description })
    return res.status(200).json({
        message: "note update successfully",
    })
})


module.exports = app