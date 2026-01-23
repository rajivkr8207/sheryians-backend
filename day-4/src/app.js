const express = require('express')


const app = express()

app.use(express.json())

let notes = []

app.get('/', (req,res)=>{
    res.send("welcome to server js")
})

app.post("/notes", (req,res)=>{
    const data = req.body
    notes.push(data)
    res.send("notes created successfully")
})

app.get('/notes', (req,res)=>{
    res.send(notes)
} )
app.get('/notes/:index', (req,res)=>{
    const idx = req.params.index
    res.send(notes[idx])
})


app.delete('/notes/:index', (req,res)=>{
    const idx = req.params.index
    delete notes[idx]
    res.send('delete successfully')
})


app.patch('/notes/:index', (req,res)=>{
    const idx = req.params.index
    const data = req.body.description
    notes[idx].description = data
    res.send('data updated successfully')
})






module.exports = app