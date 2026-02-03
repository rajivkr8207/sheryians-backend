const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())
app.use(express.static('./public'))

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

app.put('/api/notes/:id', async (req, res) => {
    const { title, description } = req.body

    await note.findByIdAndUpdate(req.params.id, {title, description })
    return res.status(200).json({
        message: "note update successfully",
    })
})
// console.log(__dirname);
// app.use('*name', (req, res) => {
//     res.sendFile('./index.html')
// })


module.exports = app