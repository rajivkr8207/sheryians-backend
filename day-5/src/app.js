const express = require('express');
const app = express();

let notes = []

app.use(express.json())

app.get('/', (req, res) => {
    res.send('server is woring perfectly')
})

app.post('/notes', (req, res) => {
    const { title, description } = req.body

    notes.push({
        title, description
    })
    res.status(201).json({
        message: 'notes created successfully'
    })
})

app.get('/notes', (req, res) => {
    res.status(200).json({
        data: notes
    })
})

app.get('/notes/:index', (req, res) => {
    const { index } = req.params
    res.status(200).json({
        data: notes[index]
    })
})


app.delete('/notes/:index', (req, res) => {
    const { index } = req.params
    delete notes[index]
    res.status(204).json({
        message: 'notes delted successfully'

    })
})

app.patch('/notes/:index', (req, res) => {
    const { index } = req.params
    const description = req.body.description
    notes[index].description = description;
    res.status(200).json({
        message: 'notes update successfully'

    })
})



module.exports = app;